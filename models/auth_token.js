const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AuthTokenSchema = new Schema({
  body: { type: String, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('AuthToken', AuthTokenSchema);
