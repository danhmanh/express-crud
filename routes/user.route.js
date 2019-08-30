const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');

router.post('/sign_up', users_controller.createUser);

module.exports = router;
