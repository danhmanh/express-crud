const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
  name: {type: String, required: true, max: 100},
  genre: {type: String, required: true},
  duration: {type: Number}
});

module.exports = mongoose.model('Song', SongSchema)
