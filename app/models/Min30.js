const { model , Schema} = require('mongoose')

const newMin30Schema = new Schema({
  startingHour: {
    type: String,
    required: true
  },

  endingHour: {
    type: String
  },

})

module.exports = model('Min30', newMin30Schema);
