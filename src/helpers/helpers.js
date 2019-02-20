const moment = require('moment');

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

module.exports = helpers;