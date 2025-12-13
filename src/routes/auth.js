const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateLogin } = require('../validators/authValidators');
const { loginLimiter } = require('../middlewares/rateLimiters');

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login (bcrypt + validation + rate limit)
 */
router.post('/login', loginLimiter, validateLogin, authController.login);

module.exports = router;