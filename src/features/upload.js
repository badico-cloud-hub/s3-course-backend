const { v4: uuid } = require('uuid')
const { getFileProps } = require('../utils')

module.exports = (repository, storageService) => async (fileName) => {
  const { fileNameOnly, fileExtension } = getFileProps(fileName)
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

