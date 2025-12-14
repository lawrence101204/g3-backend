const AppError = require('../utils/AppError');
const CODES = require('./errorCodes');

module.exports = function validateEnv(config) {
  if (!config.auth.jwtSecret) {
    throw new AppError('JWT_SECRET is required', 500, CODES.INTERNAL_ERROR);
  }

  // DB vars can be optional for local XAMPP setups, but validate if any DB_HOST is set.
  // (Safe to keep lenient for school/demo environments)
  return true;
};