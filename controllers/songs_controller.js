const Song = require('../models/song');

exports.createSong = async (req, res) => {
  try {
    let { name, genre, duration } = req.body;
    let song = new Song({ name, genre, duration });
    await song.save();
    return res.send(song);
  } catch (err) {
    return res.send({ message: 'Something went wrong.' })
  }
}

exports.showSong = async (req, res) => {
  let songQuery = Song.findById(req.params.id);

  try {
    let song = await songQuery.exec();
    res.status(200).send(song);
  } catch (err) {
    res.status(404).send({ message: 'Song not found.' });
  }

};

exports.indexSong = async (req, res) => {
  try {
    let songs = await Song.find({});
    res.status(200).send({ status: 'success', songs: songs });
  } catch (err) {
    console.log(err);
  }
};

exports.updateSong = async (req, res) => {
  let newSong = req.body;

  try {
    let song = await Song.findByIdAndUpdate(req.params.id, newSong);
    res.status(200).send({ message: 'Song updated.', data: song });
  } catch (err) {
    res.status(404).send({ message: 'Song not found.' });
  }
};

exports.destroySong = async (req, res) => {
  try {
    await Song.findByIdAndRemove(req.params.id);
    res.status(200).send({ message: 'Song deleted.' });
  } catch (err) {
    res.status(404).send({ message: 'Song not found.' });
  }
}

