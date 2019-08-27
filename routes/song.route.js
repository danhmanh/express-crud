const express = require('express');
const router = express.Router();

const song_controller = require('../controllers/song.controller');

router.get('/', song_controller.song_index);
router.post('/', song_controller.song_create);
router.get('/:id', song_controller.song_show);
router.put('/:id', song_controller.song_update);
router.delete('/:id', song_controller.song_destroy);
module.exports = router;
