const {Schema, model} = require('mongoose');

const User = new Schema({
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  roles: [{type: String, ref: 'Role'}],
  phone: { type: String, required: true }
}); 

module.exports = model('User', User);
