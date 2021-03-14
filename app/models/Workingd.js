const { model , Schema} = require('mongoose')

const newWorkingdSchema = new Schema({
  hour: {
    type: String,
  },
  minute: {
    type: String,
    required: true
  },
})

module.exports = model('Workingd', newWorkingdSchema);
