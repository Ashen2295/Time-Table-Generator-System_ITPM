const { model , Schema} = require('mongoose')

const newLecroomaloSchema = new Schema({
  lecturer: {
    type: String,
  },
  room: {
    type: String,
  },
})

module.exports = model('Lecroomalo', newLecroomaloSchema);
