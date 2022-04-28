const aws = require('aws-sdk');
const s3_client = new aws.S3()

module.exports = {
  getPutSignedUrl: async (fileName, fileExtension) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: `image/${fileExtension}`
    }
    return s3_client.getSignedUrlPromise('putObject', params)
  },
} 
