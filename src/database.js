const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));