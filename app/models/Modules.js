const { model , Schema} = require('mongoose')

const newModuleSchema = new Schema({
  offeredYear: {
    type: String,
    required: true
  },
  offeredSem: {
    type: String,
    required: true
  },
  sName: {
    type: String
  },
  sCode: {
    type: String
  },
  lHours: {
    type: String
  },
  lMins: {
    type: String
  },
  tHours: {
    type: String
  },
  tMins: {
    type: String
  },
  labHours: {
    type: String
  },
  labMins: {
    type: String
  },
  eHours: {
    type: String
  },
  eMins: {
    type: String
  }
})

module.exports = model('Module', newModuleSchema);
