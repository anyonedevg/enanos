const moment = require('moment');

const helpers = {};

helpers.timeago = timestamp => {
  return moment(timestamp).startOf('minute').fromNow()
};

helpers.postDate = timestamp => {
  moment.locale('es');
  return moment(timestamp).format('LLLL');
};

helpers.isAdmin = (role, options) => {
  const fnTrue = options.fn;
  const fnFalse = options.inverse;
  return role === "administrador" ? fnTrue() : fnFalse();
}

module.exports = helpers;