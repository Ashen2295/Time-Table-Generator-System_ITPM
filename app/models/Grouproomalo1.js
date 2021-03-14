const { model , Schema} = require('mongoose')

const newGrouproomalo1Schema = new Schema({
  group1: {
    type: String,
  },
  room1: {
    type: String,
  },
})

module.exports = model('Grouproomalo1', newGrouproomalo1Schema);
