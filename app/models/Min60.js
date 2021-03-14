const { model , Schema} = require('mongoose')

const newMin60Schema = new Schema({
  startingHour: {
    type: String,
  },
  endingHour: {
    type: String
  },
})

module.exports = model('Min60', newMin60Schema);
