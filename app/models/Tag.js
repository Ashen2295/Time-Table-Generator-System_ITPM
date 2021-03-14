const { model , Schema} = require('mongoose')

const newTagSchema = new Schema({
  tagSelect: {
    type: String,
  },
  
})

module.exports = model('Tag', newTagSchema);
