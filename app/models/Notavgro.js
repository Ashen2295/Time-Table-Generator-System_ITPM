const { model , Schema} = require('mongoose')

const newNotavgroSchema = new Schema({
  group: {
    type: String,
  },
  starting_time_hour: {
    type: String,
  },
  starting_time_minute: {
    type: String,
  },
  ending_time_hour: {
    type: String,
  },
  ending_time_minute: {
    type: String,
  },
})

module.exports = model('Notavgro', newNotavgroSchema);
