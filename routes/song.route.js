const express = require('express');
const router = express.Router();

const songs_controller = require('../controllers/songs_controller');

router.get('/', songs_controller.indexSong);
router.post('/', songs_controller.createSong);
router.get('/:id', songs_controller.showSong);
router.put('/:id', songs_controller.updateSong);
router.delete('/:id', songs_controller.destroySong);

module.exports = router;
