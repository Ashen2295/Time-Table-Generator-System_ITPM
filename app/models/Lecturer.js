const { model , Schema} = require('mongoose')

const newLecturerSchema = new Schema({
  lecName: {
    type: String,
    required: true
  },
  lecId: {
    type: String,
    required: true
  },
  faculty: {
    type: String
  },
  department: {
    type: String
  },
  center: {
    type: String
  },
  building: {
    type: String
  },
  category: {
    type: String
  },
})

module.exports = model('Lecturer', newLecturerSchema);



