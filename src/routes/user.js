// requirements
const user = require('../controllers/user');
const passport = require('passport');
const router = require('express').Router();

// login
router.get('/users/login', user.Login);
router.post('/users/login', passport.authenticate('local-login', {
  successRedirect: '/vets',
  failureRedirect: '/users/login',
  failureFlash: true
}));

// signup
router.get('/users/signup', user.Signup);
router.post('/users/signup', passport.authenticate('local-signup', {
  successRedirect: '/vets',
  failureRedirect: '/users/signup',
  failureFlash: true
}));
router.get('/users/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

// export router
module.exports = router;