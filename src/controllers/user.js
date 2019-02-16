const ctrl = {}

ctrl.Login = (req, res) => {
  res.render('user/login');
};

ctrl.Signup = (req, res) => {
  res.render('user/signup');
}

ctrl.Register = () => {

}

module.exports = ctrl;