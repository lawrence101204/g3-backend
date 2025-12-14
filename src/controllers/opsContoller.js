const asyncHandler = require('../utils/asyncHandler');
const db = require('../config/db');
const { ok } = require('../utils/response');

exports.health = asyncHandler(async (req, res) => {
  return ok(res, {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }, 'Service is healthy');
});

exports.ready = asyncHandler(async (req, res) => {
  await db.query('SELECT 1');
  return ok(res, { status: 'ready' }, 'Service is ready');
});
