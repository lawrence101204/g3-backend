const rateLimit = require('express-rate-limit');
const config = require('../config');

const loginLimiter = rateLimit({
  windowMs: config.rate.loginWindowMin * 60 * 1000,
  max: config.rate.loginMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
});

module.exports = { loginLimiter };
