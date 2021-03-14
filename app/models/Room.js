const { model , Schema} = require('mongoose')

const newRoomSchema = new Schema({
  buildingName: {
    type: String,
    required: true
  },
  roomName: {
    type: String,
    required: true
  },
  categoty: {
    type: String
  },
  type: {
    type: String
  },
})

module.exports = model('Room', newRoomSchema);
