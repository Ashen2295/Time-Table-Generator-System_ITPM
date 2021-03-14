const { model , Schema} = require('mongoose')

const newWorkingdaySchema = new Schema({
  day: {
    type: String,
    required: true
  },
  monday: {
    type: String,
    required: true
  },
  tuesday: {
    type: String
  },
  wednesday: {
    type: String
  },
  thursday: {
    type: String
  },
  friday: {
    type: String
  },
})

module.exports = model('Workingday', newWorkingdaySchema);