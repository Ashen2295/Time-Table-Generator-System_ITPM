const { model , Schema} = require('mongoose')

const newWorkingHourSchema = new Schema({
  hours: {
    type: String,
    required: true
  },
  minitues: {
    type: String,
    required: true
  },
})

module.exports = model('WorkingHour', newWorkingHourSchema);
