const { fail } = require('../utils/response');
const CODES = require('../config/errorCodes');

module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const code = err.code || CODES.INTERNAL_ERROR;

  console.error('ERROR', {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    status,
    code,
    message: err.message,
    details: err.details,
  });

  return fail(res, err.message || 'Internal Server Error', status, { code, details: err.details });
};