const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/tours', require('./tours'));
router.use('/inquiries', require('./inquiries'));
router.use('/', require('./ops'));

module.exports = router;
