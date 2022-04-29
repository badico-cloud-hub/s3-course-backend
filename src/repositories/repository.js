const imageModel = require('../model');

module.exports = {
  create: async function(params) {
    if (!params.key) throw new Error("missing 'key' param")
    const newRecord = await imageModel.create({
      key: params.key
    })
    return newRecord
  },
  delete: async function() {
    return true
  },
  list: async function() {
    return imageModel.find().lean()
  },
}



