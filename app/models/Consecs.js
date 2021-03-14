const { model , Schema} = require('mongoose')

const newConsecsSchema = new Schema({
  description: {
    type: String,
  },
  first_session: {
    type: String,
  },
  second_session: {
    type: String,
  },
})

module.exports = model('Consecs', newConsecsSchema);
