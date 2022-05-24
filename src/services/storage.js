const aws = require('aws-sdk');
const { default: CacheTool } = require('dcache_content')
const { getFileProps } = require('../utils')
const s3_client = new aws.S3()

const {
  SIGNED_URL_LIFETIME_HOURS,
  CACHE_LIFETIME,
  AWS_BUCKET_NAME,
  AWS_BUCKET_THUMBNAILS,
  THUMBNAILS_SIZES
} = process.env

const getParamsByBucket = ({ fileNameOnly, fileExtension }, size) => {
  const isThumbnail = size != 0
  if (isThumbnail) {
    return {
      Key: `${fileNameOnly}_${size}_.${fileExtension}`,
      Bucket: AWS_BUCKET_THUMBNAILS
    }
  }
  return {
    Key: `${fileNameOnly}.${fileExtension}`,
    Bucket: AWS_BUCKET_NAME,
  }
}

const getOneSignedUrl = (fileProps, size) => {
  const params = {
    ...getParamsByBucket(fileProps, size),
    Expires: 3600 * (SIGNED_URL_LIFETIME_HOURS ?? 1)
  }
  return s3_client.getSignedUrlPromise('getObject', params)
}

const generateNewCacheRecord = async (content) => {
  const fileProps = getFileProps(content)
  const newRecord = {}
  for (imageSize of THUMBNAILS_SIZES.split(':')) {
    const result = await getOneSignedUrl(fileProps, imageSize)
    newRecord[imageSize] = result
  }
  return newRecord;
}

const cacheConfig = {
  cacheHoursLifetime: CACHE_LIFETIME ?? 1
}

const cacheTool = new CacheTool(generateNewCacheRecord, cacheConfig)

module.exports = {
  getPutSignedUrl: async (fileName, fileExtension) => {
    const params = {
      Bucket: AWS_BUCKET_NAME ?? "",
      Key: `${fileName}.${fileExtension}`,
      ContentType: `image/${fileExtension}`
    }
    return s3_client.getSignedUrlPromise('putObject', params)
  },
  getSignedUrl: async (fileKey) => cacheTool.getValue(fileKey)
}


