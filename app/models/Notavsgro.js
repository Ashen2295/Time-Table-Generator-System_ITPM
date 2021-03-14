const { model , Schema} = require('mongoose')

const newNotavsgroSchema = new Schema({
  sub_group: {
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

module.exports = model('Notavsgro', newNotavsgroSchema);
