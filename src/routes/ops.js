const express = require('express');
const router = express.Router();
const ops = require('../controllers/opsController');

router.get('/health', ops.health);
router.get('/ready', ops.ready);

module.exports = router;
