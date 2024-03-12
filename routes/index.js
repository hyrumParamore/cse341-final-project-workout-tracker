const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');

router.use('/', middleware.createNewUser, require('./auth') )
router.use('/', require('./swagger'));
router.use('/exercises', require('./exercises'))

module.exports = router; 