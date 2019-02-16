const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const md5 = require('md5');
const { User } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ email });
  if (user) {
    return done(null, false, req.flash('signupMessage', 'El correo introducido ya está registrado.'));
  } else {
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.gravatar = md5(email);
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return done(null, false, req.flash('loginMessage', 'El usuario no fue encontrado.'));
  }
  if (!user.comparePassword(password)) {
    return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));
  }
  return done(null, user);
}));