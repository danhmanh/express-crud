const express = require('express');
const router = express.Router();

const sessions_controller = require('../controllers/sessions_controller');

router.post('/login', sessions_controller.login);
router.delete('/logout', sessions_controller.logout);

module.exports = router;
