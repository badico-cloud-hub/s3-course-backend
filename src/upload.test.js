const upload = require('./upload');


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


