const AppError = require('../utils/AppError');
const CODES = require('../config/errorCodes');

module.exports = (req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404, CODES.NOT_FOUND));
};
