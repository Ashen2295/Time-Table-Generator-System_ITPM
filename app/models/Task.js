const { model , Schema} = require('mongoose')

const newTaskSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  note: {
  },
})

module.exports = model('Task', newTaskSchema);
