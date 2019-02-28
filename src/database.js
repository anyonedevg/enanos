const mongoose = require('mongoose');
// mongodb://localhost/enanos
mongoose.connect('mongodb+srv://anyone:Luglayro1231@cluster0-bav0t.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));