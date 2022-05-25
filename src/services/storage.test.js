const mockAwsS3Instance = {
  getSignedUrlPromise: jest.fn().mockResolvedValue("here goes a signed url")
}
const mockDocumentClient = {
  config: jest.fn()
}
const mockDynamoDB = {
  DocumentClient: jest.fn(() => mockDocumentClient)
}

const { generateNewCacheRecord } = require('./storage')

jest.mock('aws-sdk', () => ({
  S3: jest.fn(() => mockAwsS3Instance),
  DynamoDB: mockDynamoDB
})
)

describe("Unit Tests -> Storage Service -> Custom Generate Function", () => {
  it("should return 4 keys for 4 sizes defined", async () => {
    const result = await generateNewCacheRecord("something.jpg")
    expect(Object.keys(result).length).toBe(4)
  })
  it("should return correct key values", async () => {
    const result = await generateNewCacheRecord("something.jpg")
    expect(Object.keys(result)).toEqual(["0", "150", "300", "400"])
  })
  it("should send correct params to s3 client", async () => {
    await generateNewCacheRecord("something.jpg")
    expect(mockAwsS3Instance.getSignedUrlPromise).toHaveBeenLastCalledWith("getObject", {
      Key: "something_400_.jpg",
      Bucket: process.env.AWS_BUCKET_THUMBNAILS,
      Expires: 7200
    })
  })
})
