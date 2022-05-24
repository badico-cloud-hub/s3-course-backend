const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  key: String,
  name: String,
},
  {
    timestamps: true,
  });

const Images = mongoose.model('Images', imageSchema);

module.exports = Images
