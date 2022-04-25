const express = require('express');
const router = express.Router();

const errorHandler = require('../controllers/index');

router.use('/api',require('./api'))

router.use('/*',errorHandler.errorHandler);
module.exports = router;