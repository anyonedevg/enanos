const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gravatar: { type: String, required: true },
  role: { type: String, default: 'usuario' }
});

UserSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = model('User', UserSchema);