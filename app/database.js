const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ashen_123:ashen_123@cluster0.2nfmh.mongodb.net/timetable_management_01?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log(''))
  .catch(err => console.log(err));
