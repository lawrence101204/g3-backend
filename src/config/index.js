module.exports = {
  port: Number(process.env.PORT || 5000),
  corsOrigins: (process.env.CORS_ORIGIN || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  rate: {
    loginWindowMin: Number(process.env.LOGIN_RATE_WINDOW_MIN || 15),
    loginMax: Number(process.env.LOGIN_RATE_MAX || 10),
  },
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 12),
};
