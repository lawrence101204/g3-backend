const AppError = require('../utils/AppError');
const CODES = require('./errorCodes');

function requireEnv(name) {
  const v = process.env[name];
  if (v === undefined) {
    throw new AppError(`Missing required env var: ${name}`, 500, CODES.CONFIG_MISSING);
  }
  return v;
}

function validateEnv() {
  // Required for security
  requireEnv('JWT_SECRET');

  // DB vars are optional here because db.js provides XAMPP-friendly defaults:
  // DB_HOST=localhost, DB_USER=root, DB_PASSWORD='', DB_NAME=lavera
}

module.exports = validateEnv;
