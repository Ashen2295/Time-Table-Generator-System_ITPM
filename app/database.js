const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:123@electronttm.zal8h.mongodb.net/time_table?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB is up and running'))
  .catch(err => console.log(err));
