const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  key: String
});

const Images = mongoose.model('Images', imageSchema);

module.exports = Images
