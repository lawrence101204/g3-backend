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

exports.get = asyncHandler(async (req, res) => {
  const tour = await tours.getTour(Number(req.params.id));
  if (!tour) throw new AppError('Tour not found', 404, CODES.NOT_FOUND);
  return ok(res, tour, 'Tour fetched');
});

exports.create = asyncHandler(async (req, res) => {
  const created = await tours.createTour(req.body);
  return ok(res, created, 'Tour created', 201);
});

exports.update = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const existing = await tours.getTour(id);
  if (!existing) throw new AppError('Tour not found', 404, CODES.NOT_FOUND);

  const updated = await tours.updateTour(id, req.body);
  return ok(res, updated, 'Tour updated');
});

exports.remove = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const done = await tours.deleteTour(id);
  if (!done) throw new AppError('Tour not found', 404, CODES.NOT_FOUND);
  return ok(res, { id }, 'Tour deleted');
});
