
module.exports = (repository) => async () => {
  const allImages = await repository.list()
  return allImages.map(image => ({
    ...image,
    url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${image.key}`
  }))
}





