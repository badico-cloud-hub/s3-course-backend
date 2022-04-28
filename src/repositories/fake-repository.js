const { v4: uuid } = require('uuid');

const initialData = {}

module.exports = {
  database: initialData,
  create: function(params) {
    if (params.key) {
      const newRecord = { id: uuid(), ...params }
      this.database[newRecord.id] = newRecord;
      return newRecord
    }
    return false;
  },
  delete: function(imageId) {
    delete this.database[imageId]
    return true
  },
  list: function() {
    return Object.values(this.database)
  },
  clean: function() {
    this.database = {}
  }
}
