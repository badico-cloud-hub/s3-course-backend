const getFileProps = (fileName) => {
  const fileNameSplitted = fileName.split('.');
  if (fileNameSplitted.length < 2) throw new Error('No file extension found')
  const fileExtension = fileNameSplitted.pop();
  const fileNameOnly = fileNameSplitted.join('.')
  return { fileExtension, fileNameOnly }
}


module.exports = { getFileProps }
