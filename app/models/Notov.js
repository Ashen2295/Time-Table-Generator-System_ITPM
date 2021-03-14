const { model , Schema} = require('mongoose')

const newNotovSchema = new Schema({
  description: {
    type: String,
  },
  session_1: {
    type: String,
  },
  session_2: {
    type: String
  },
  session_3: {
    type: String
  },
  session_4: {
    type: String
  },
  session_5: {
    type: String
  },
})

module.exports = model('Notov', newNotovSchema);
