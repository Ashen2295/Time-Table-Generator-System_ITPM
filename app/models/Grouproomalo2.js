const { model , Schema} = require('mongoose')

const newGrouproomalo2Schema = new Schema({
  group2: {
    type: String,
  },
  room2: {
    type: String,
  },
})

module.exports = model('Grouproomalo2', newGrouproomalo2Schema);
