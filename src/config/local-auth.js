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

// user signup validation
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const { username, confirmPassword } = req.body
  const userByEmail = await User.findOne({ email });
  const userByUsername = await User.findOne({ username });
  if (userByEmail) {
    return done(null, false, req.flash('signupMessage', 'El correo introducido ya está registrado.'));
  } else if (userByUsername) {
    return done(null, false, req.flash('signupMessage', 'El nombre de usuario ya está registrado.'));
  } else if (password !== confirmPassword) {
    return done(null, false, req.flash('signupMessage', 'Las contraseñas no coinciden.'));
  } else {
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.gravatar = md5(email);
    await newUser.save();
    done(null, newUser);
  }
}));

// user login validation
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ email: email });
  console.log(req.body);
  if (!user) {
    return done(null, false, req.flash('loginMessage', 'El usuario no fue encontrado.'));
  }
  if (!user.comparePassword(password)) {
    return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta.'));
  }

  return done(null, user);


}));