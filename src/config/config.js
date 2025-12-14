require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },

  auth: {
    jwtSecret: process.env.JWT_SECRET || '',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },

  rate: {
    loginWindowMin: Number(process.env.LOGIN_RATE_WINDOW_MIN || 15),
    loginMax: Number(process.env.LOGIN_RATE_MAX || 10),
  },

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
    connectionLimit: Number(process.env.DB_POOL_LIMIT || 10),
  },

  email: {
    host: process.env.EMAIL_HOST || '',
    port: process.env.EMAIL_PORT || '',
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
    from: process.env.EMAIL_FROM || '',
    to: process.env.EMAIL_TO || '',
  },
};