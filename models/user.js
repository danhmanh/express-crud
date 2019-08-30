const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  username: {type: String, unique: true, required: true, max: 10},
  password: {type: String, required: true, max: 10},
  auth_tokens: [{type: Schema.Types.ObjectId, ref: 'AuthToken'}]
});

module.exports = mongoose.model('User', UserSchema);
