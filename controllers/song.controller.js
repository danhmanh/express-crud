const Song = require('../models/song.model');

exports.song_create = (req, res) => {
  let song = new Song({
    name: req.body.name,
    genre: req.body.genre,
    duration: req.body.duration
  });

  song.save(err => {
    if (err) {
      res.send({message: 'Something gone wrong.'});
    } else {
      res.send(song);
    }
  })
};

exports.song_show = (req, res) => {
  let song = Song.findById(req.params.id);
  song.exec((err, data) => {
    if (err) {
      res.status(404).send({ message: 'Song not found.' });
    } else {
      res.status(200).send(data);
    }
  })
};

exports.song_index = (req, res) => {
  Song.find({}, (err, songs) => {
    res.status(200).send({ status: 'success', songs: songs });
  });
};

exports.song_update = (req, res) => {
  let newSong = req.body;

  Song.findByIdAndUpdate(req.params.id, newSong, (err, data) => {
    if (err) {
      res.status(404).send({ message: 'Song not found.' });
    } else {
      res.status(200).send({ message: 'Song updated.', data: data });
    }
  });
};

exports.song_destroy = (req, res) => {
  Song.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(404).send({ message: 'Song not found.' });
    } else {
      res.status(200).send({ message: 'Song deleted.'});
    }
  });
}

