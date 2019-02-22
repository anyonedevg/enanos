const moment = require('moment');

const { Like } = require('../models');

const helpers = {};

helpers.timeago = timestamp => {
  return moment(timestamp).startOf('minute').fromNow()
};

helpers.shortdate = timestamp => {
  return moment(timestamp).format('L')
};

helpers.esAdmin = (role, options) => {
  const fnTrue = options.fn;
  const fnFalse = options.inverse;
  return role === "administrador" ? fnTrue() : fnFalse();
}

helpers.testHelper = function (foo, bar, options) {
  const fnTrue = options.fn;
  const fnFalse = options.inverse;
  // const user_id = foo;
  // const bars = bar;
  // console.log('user_id - TESTHELPER', user_id);
  // console.log(bar);

  // let dioLike = false;

  // console.log('ENTRANDO A LA ITERACIÓN');
  // for (const iterator of bar) {
  //   console.log('ITERADOR USER ID', iterator.user_id._id);
  //   console.log('ID USUARIO', foo);
  //   if (iterator.user_id._id.toString() == foo) {
  //     console.log('DENTRO DEL IF');
  //     dioLike = true;
  //   }
  // }
  // console.log('FIN DE LA ITERACIÓN')

  // if (dioLike) {
  //   console.log('DIO LIKE');
  //   return fnFalse();
  // } else {
  //   console.log('NO DIO LIKE');
  //   return fnTrue();
  // }
  return fnTrue();
};


helpers.diolike = (id, options) => {
  const fnTrue = options.fn;
  const fnFalse = options.inverse;
  console.log('user._id DIOLIKE', id);
  return id ? fnTrue() : fnFalse();
}
module.exports = helpers;