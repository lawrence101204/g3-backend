const { body } = require('express-validator');
const { handleValidation } = require('./common');

const validateLogin = [
  body('username').trim().notEmpty().withMessage('username is required').isLength({ min: 3, max: 50 }),
  body('password').notEmpty().withMessage('password is required').isLength({ min: 8, max: 100 }),
  handleValidation,
];

module.exports = { validateLogin };