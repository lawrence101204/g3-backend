const asyncHandler = require('../utils/asyncHandler');
const { ok } = require('../utils/response');

exports.health = asyncHandler(async (req, res) => {
  return ok(
    res,
    {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    'Service is healthy'
  );
});
