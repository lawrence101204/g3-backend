const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const CODES = require('../config/errorCodes');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const details = errors.array().map((e) => ({ field: e.path, message: e.msg }));
    return next(new AppError('Validation failed', 400, CODES.VALIDATION_ERROR, details));
  }
  next();
}

module.exports = { handleValidation };
