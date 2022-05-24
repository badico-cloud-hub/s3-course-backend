const aws = require('aws-sdk');
const { default: CacheTool } = require('dcache_content')
const s3_client = new aws.S3()

const { SIGNED_URL_LIFETIME_HOURS, CACHE_LIFETIME, AWS_BUCKET_NAME } = process.env

const generateNewCacheRecord = async (content) => {
  const params = {
    Bucket: AWS_BUCKET_NAME ?? "",
    Key: content,
    Expires: 3600 * (SIGNED_URL_LIFETIME_HOURS ?? 1)
  }
  return s3_client.getSignedUrlPromise('getObject', params)
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


