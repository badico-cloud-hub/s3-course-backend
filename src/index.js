const express = require('express')
const morgan = require('morgan');

const routes = express.Router();

routes.get('/health', (req, res) => res.json({
  ok: true,
  env: process.env.STAGE,
  message: "everything is awesome",
})
);

const app = express()
app.use(express.json());
app.use(morgan('combined'));
app.use(`/${process.env.STAGE}`, routes);
app.listen(process.env.PORT, () => console.log('Server is running on port ', process.env.PORT))
