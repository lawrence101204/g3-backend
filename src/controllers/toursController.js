/**
 * Tours controller.
 * Handles HTTP request/response mapping for tour-related endpoints.
 * Business logic is delegated to the service layer.
 */

const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const CODES = require('../config/errorCodes');
const { ok } = require('../utils/response');
const tours = require('../services/toursService');


/**
 * GET /api/tours
 * Returns paginated list of tours with optional filters.
 */
exports.list = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const data = await tours.listTours({
    page,
    limit,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
  });

  return ok(res, data, 'Tours fetched');
});
