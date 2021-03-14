const { model , Schema} = require('mongoose')

const newWorkingtimeSchema = new Schema({
  hour: {
    type: String,
  },
  minute: {
    type: String,
  },
})

module.exports = model('Workingtime', newWorkingtimeSchema);
