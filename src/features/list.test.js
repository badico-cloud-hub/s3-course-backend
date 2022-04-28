const fakeRepository = require('../repositories/fake-repository')
const list = require('./list')(fakeRepository)

afterEach(() => {
  fakeRepository.clean();
})

test('should list entries', async () => {

  fakeRepository.create({ key: 'firstImage.jpg' })
  fakeRepository.create({ key: 'secondImage.jpg' })
  fakeRepository.create({ key: 'thirdImage.jpg' })

  const result = await list()
  expect(result.length).toBe(3)
})

test('should bring urls ', async () => {

  fakeRepository.create({ key: 'firstImage.jpg' })
  fakeRepository.create({ key: 'secondImage.jpg' })
  fakeRepository.create({ key: 'thirdImage.jpg' })

  const result = await list()
  expect(result).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ url: expect.stringMatching(/http/) }),
      expect.objectContaining({ url: expect.stringMatching(/http/) }),
      expect.objectContaining({ url: expect.stringMatching(/http/) }),
    ])
  )
})
