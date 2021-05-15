const express = require('express');
const path = require('path');
let logDBMiddleware = require('../middlewares/logDBMiddleware');

const mainController = require('../controllers/mainController');
 
const router = express.Router();

router.get('/', logDBMiddleware, mainController.index);

module.exports = router;