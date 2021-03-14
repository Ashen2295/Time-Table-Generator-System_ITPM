const { model , Schema} = require('mongoose')

const newGrouproomalo3Schema = new Schema({
  group3: {
    type: String,
  },
  room3: {
    type: String,
  },
})

module.exports = model('Grouproomalo3', newGrouproomalo3Schema);
