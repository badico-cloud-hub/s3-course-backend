const storageStub = require('../services/storage.stub')
const fakeRepository = require('../repositories/fake-repository')
const upload = require('./upload')(fakeRepository, storageStub);

afterEach(() => {
  fakeRepository.clean()
});

test('test upload function', async () => {
  const fileName = "imagemTeste.png"
  const result = await upload(fileName)
  expect(result).toHaveProperty('name', 'imagemTeste')
  expect(result).toHaveProperty('extension', 'png')
})

test('return error for no file extension', async () => {
  const fileName = "imagemTeste"
  let error;
  try {
    await upload(fileName);
  } catch (e) {
    error = e
  }
  expect(error).toBeInstanceOf(Error);
})

test('correct behavior for names with more than one dot', async () => {
  const fileName = "imagem.Teste.1.png"
  const result = await upload(fileName)
  expect(result).toHaveProperty('name', 'imagem.Teste.1')
  expect(result).toHaveProperty('extension', 'png')
})

test('it should create a new record', async () => {
  const fileName = "newRecordTest.png"
  await upload(fileName)
  const allImages = fakeRepository.list()
  expect(allImages).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        key: fileName
      })
    ])
  )
})
