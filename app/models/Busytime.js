const { model , Schema} = require('mongoose')

const newBusytimeSchema = new Schema({
  room: {
    type: String,
  },
  date: {
    type: String,
  },
  starting_time: {
    type: String,
  },
  ending_time: {
    type: String,
  },
})

module.exports = model('Busytime', newBusytimeSchema);
