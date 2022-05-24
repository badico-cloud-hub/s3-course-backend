
module.exports = {
  getPutSignedUrl: async (fileName, fileExtension) => {
    return `${fileName}.${fileExtension}`
  },
  getSignedUrl: async (fileKey) => {
    return `https://bucket.s3.amazonaws.com/${fileKey}`
  },
} 
