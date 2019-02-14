const express = require('express');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

// initializations
const app = express();
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
require('./database');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.jpeg')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage }).single('image'));


// routes
app.use(require('./routes'));
app.use(require('./routes/vets'));
app.use(require('./routes/admin'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
})