
module.exports = (repository, storageService) => async () => {
  const allImages = await repository.list()
  return Promise.all(allImages.map(async (image) => {
    const url = await storageService.getSignedUrl(image.key)
    return {
      ...image,
      url,
    }
  }))
}





