const AppError = require('../utils/AppError');
const CODES = require('../config/errorCodes');

module.exports = (req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404, CODES.ROUTE_NOT_FOUND));
};
