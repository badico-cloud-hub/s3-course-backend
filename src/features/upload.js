module.exports = (repository, storageService) => async (fileName) => {
  const fileNameSplitted = fileName.split('.');
  if (fileNameSplitted.length < 2) throw new Error('No file extension found')
  const fileExtension = fileNameSplitted.pop();
  const fileNameOnly = fileNameSplitted.join('.')
  const url = await storageService.getPutSignedUrl(fileNameOnly, fileExtension)
  const newImageRecord = await repository.create({ key: fileName })
  if (!newImageRecord.id) throw new Error('Something went wrong')
  return {
    url,
    name: fileNameOnly,
    extension: fileExtension
  }
}

