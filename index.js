const express = require('express')
const morgan = require('morgan');
const aws = require('aws-sdk')

const s3_client = new aws.S3()
const routes = express.Router();

routes.get('/health', (req, res) => res.json({
  ok: true,
  env: process.env.STAGE,
  message: "everything is awesome",
}));

routes.post('/files', async (req, res) => {
  const { fileName } = req.body;
  const fileNameSplitted = fileName.split('.');
  const fileExtension = fileNameSplitted.pop();
  const params = {
    Bucket: 'bilblue-backoffice-files',
    Key: `${fileNameSplitted.join('.')}.${fileExtension}`,
    ContentType: `image/${fileExtension}`
  }
  const url = await s3_client.getSignedUrlPromise('putObject', params)
  return res.json({
    url,
    name: fileNameSplitted.join('.'),
    extension: fileExtension
  })
});

const app = express()
app.use(express.json());
app.use(morgan('combined'));
app.use(`/${process.env.STAGE}`, routes);
app.listen(process.env.PORT, () => console.log('Server is running on port ', process.env.PORT))
