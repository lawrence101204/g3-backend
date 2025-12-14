const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const CODES = require('../config/errorCodes');
const config = require('../config');
const { ok } = require('../utils/response');
const { findAdminByUsername } = require('../services/authService');

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await findAdminByUsername(username);
  if (!admin) throw new AppError('Invalid credentials', 401, CODES.AUTH_INVALID_CREDENTIALS);

  const match = await bcrypt.compare(password, admin.passwordHash);
  if (!match) throw new AppError('Invalid credentials', 401, CODES.AUTH_INVALID_CREDENTIALS);

  const token = jwt.sign({ sub: admin.id, username: admin.username }, config.auth.jwtSecret, {
    expiresIn: config.auth.jwtExpiresIn,
  });

  return ok(res, { token }, 'Login successful');
});
