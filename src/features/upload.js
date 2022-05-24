const { v4: uuid } = require('uuid')

module.exports = (repository, storageService) => async (fileName) => {
  const fileNameSplitted = fileName.split('.');
  if (fileNameSplitted.length < 2) throw new Error('No file extension found')
  const fileExtension = fileNameSplitted.pop();
  const fileNameOnly = fileNameSplitted.join('.')
  const uuidAndName = `${uuid()}-${fileNameOnly}`
  const url = await storageService.getPutSignedUrl(uuidAndName, fileExtension)
  const newImageRecord = await repository.create({
    key: `${uuidAndName}.${fileExtension}`,
    name: fileName,
  })
  if (!newImageRecord.id) throw new Error('Something went wrong')
  return {
    url,
    name: fileNameOnly,
    extension: fileExtension
  }
}

