const { model , Schema} = require('mongoose')

const newSessionSchema = new Schema({
  lecturer: {
    type: String,
  },
  subject: {
    type: String,
  },
  subject_code: {
    type: String
  },
  tag: {
    type: String
  },
  group_id: {
    type: String
  },
  sub_group_id: {
    type: String
  },
  student_count: {
    type: String
  },
  duration_hour: {
    type: String
  },
  duration_minute: {
    type: String
  },
})

module.exports = model('Session', newSessionSchema);
