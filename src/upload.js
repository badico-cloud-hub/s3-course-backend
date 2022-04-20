const aws = require('aws-sdk');
const s3_client = new aws.S3()

module.exports = async (fileName) => {
  const fileNameSplitted = fileName.split('.');
  if (fileNameSplitted.length < 2) throw new Error('No file extension found')
  const fileExtension = fileNameSplitted.pop();
  const params = {
    Bucket: 'bilblue-backoffice-files',
    Key: fileName,
    ContentType: `image/${fileExtension}`
  }
  const url = await s3_client.getSignedUrlPromise('putObject', params)
  return {
    url,
    name: fileNameSplitted.join('.'),
    extension: fileExtension
  }
}
