const { model , Schema} = require('mongoose')

const newStudentSchema = new Schema({
  year: {
    type: String,
    required: true
  },
  programme: {
    type: String,
    required: true
  },
  group_count: {
    type: String
  },
  sub_group_count: {
    type: String
  },
})

module.exports = model('Student', newStudentSchema);
