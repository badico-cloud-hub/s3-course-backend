const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');

const storageService = require('./services/storage')
const repository = require('./repositories/repository')
const { upload: uploadFactory, list: listFactory } = require('./features')

const routes = express.Router();

const upload = uploadFactory(repository, storageService)
const list = listFactory(repository)

routes.get('/health', (req, res) => res.json({
  ok: true,
  env: process.env.STAGE,
  message: "everything is awesome",
}));

routes.post('/files', async (req, res) => {
  const { fileName } = req.body;
  let response;
  try {
    response = await upload(fileName)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
  res.json(response)
});

routes.get('/files', async (req, res) => {
  let response;
  try {
    response = await list()
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e.message })
  }
  res.json(response)
});

const app = express()
app.use(express.json());
app.use(morgan('combined'));
app.use(`/${process.env.STAGE}`, routes);
app.listen(
  process.env.PORT,
  async () => {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log('Server is running on port ', process.env.PORT)
  }
)
