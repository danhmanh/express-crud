const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: { type: String, unique: true, required: true, trim: true, lowercase: true, max: 10 },
  password: { type: String, required: true, max: 10 }
});

// UserSchema.methods.comparePassword = (password, hashPassword) => {
//   return bcrypt.compareSync(password, hashPassword);
// }

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateToken = () => {
  const token = jwt.sign({ _id: this._id, username: this.username }, 'this-is-private-key');
  return token;
}

module.exports = mongoose.model('User', UserSchema);
