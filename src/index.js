const express = require('express');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const flash = require('connect-flash');
const morgan = require('morgan');
const multer = require('multer');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

// initializations
const app = express();
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img'),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
require('./database');
require('./config/local-auth');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./helpers/helpers')
}));
app.set('view engine', '.hbs');

// middlewares
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.jpeg')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage }).single('image'));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.loginMessage = req.flash('loginMessage');
  app.locals.user = req.user;
  next();
})


// routes
app.use(require('./routes/index.router'));
app.use(require('./routes/vet.router'));
app.use(require('./routes/admin.router'));
app.use(require('./routes/comment.router'));
app.use(require('./routes/user.router'));
app.use(require('./routes/like.router'));
app.use(require('./routes/contact.router'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
})