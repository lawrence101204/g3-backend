const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const CODES = require('../config/errorCodes');
const { ok } = require('../utils/response');
const toursService = require('../services/toursService');

exports.list = asyncHandler(async (req, res) => {
  const { page, limit, minPrice, maxPrice } = req.query;
  const data = await toursService.listTours({ page, limit, minPrice, maxPrice });
  return ok(res, data, 'Tours fetched');
});

exports.getOne = asyncHandler(async (req, res) => {
  const tour = await toursService.getTour(req.params.id);
  if (!tour) throw new AppError('Tour not found', 404, CODES.TOUR_NOT_FOUND);
  return ok(res, tour, 'Tour fetched');
});

exports.create = asyncHandler(async (req, res) => {
  const created = await toursService.createTour(req.body);
  return ok(res, created, 'Tour created', 201);
});

exports.update = asyncHandler(async (req, res) => {
  const existing = await toursService.getTour(req.params.id);
  if (!existing) throw new AppError('Tour not found', 404, CODES.TOUR_NOT_FOUND);
  const updated = await toursService.updateTour(req.params.id, req.body);
  return ok(res, updated, 'Tour updated');
});

exports.remove = asyncHandler(async (req, res) => {
  const existing = await toursService.getTour(req.params.id);
  if (!existing) throw new AppError('Tour not found', 404, CODES.TOUR_NOT_FOUND);
  await toursService.deleteTour(req.params.id);
  return ok(res, null, 'Tour deleted');
});
