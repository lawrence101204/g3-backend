const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const CODES = require('../config/errorCodes');
const { ok } = require('../utils/response');
const inquiries = require('../services/inquiryService');
const emailService = require('../services/emailService');

exports.create = asyncHandler(async (req, res) => {
  const inquiry = await inquiries.createInquiry(req.body);
  emailService.sendNewInquiryNotification(inquiry).catch(() => {});
  return ok(res, inquiry, 'Inquiry created', 201);
});

exports.list = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const data = await inquiries.listInquiries({
    page,
    limit,
    status: req.query.status,
    sort: req.query.sort || 'created_at',
    order: req.query.order || 'desc',
  });

  return ok(res, data, 'Inquiries fetched');
});

exports.updateStatus = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const existing = await inquiries.getInquiry(id);
  if (!existing) throw new AppError('Inquiry not found', 404, CODES.NOT_FOUND);

  const updated = await inquiries.updateInquiryStatus(id, req.body.status);
  return ok(res, updated, 'Inquiry status updated');
});

exports.remove = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const done = await inquiries.deleteInquiry(id);
  if (!done) throw new AppError('Inquiry not found', 404, CODES.NOT_FOUND);
  return ok(res, { id }, 'Inquiry deleted');
});
