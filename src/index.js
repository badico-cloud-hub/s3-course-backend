const express = require('express')
const morgan = require('morgan');
const upload = require('./upload')

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
    return res.status(500).json({ message: e.message })
  }
  return res.json(response)
});

const app = express()
app.use(express.json());
app.use(morgan('combined'));
app.use(`/${process.env.STAGE}`, routes);
app.listen(process.env.PORT, () => console.log('Server is running on port ', process.env.PORT))
