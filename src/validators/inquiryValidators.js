const { body, param, query } = require('express-validator');
const { handleValidation } = require('./common');

const validateInquiryCreate = [
  body('name').trim().notEmpty().isLength({ max: 200 }),
  body('email')
    .trim()
    .isEmail()
    .withMessage('email must be valid')
    .normalizeEmail(),
  body('message').trim().notEmpty().isLength({ min: 5, max: 5000 }),
  body('status').optional().isIn(['new', 'open', 'closed']),
  handleValidation,
];

const validateInquiryListQuery = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('status').optional().isIn(['new', 'open', 'closed']),
  query('sort').optional().isIn(['created_at', 'status', 'id']),
  query('order').optional().isIn(['asc', 'desc']),
  handleValidation,
];

const validateInquiryId = [
  param('id').isInt({ min: 1 }),
  handleValidation,
];

const validateInquiryStatusUpdate = [
  param('id').isInt({ min: 1 }),
  body('status').isIn(['new', 'open', 'closed']),
  handleValidation,
];

module.exports = {
  validateInquiryCreate,
  validateInquiryListQuery,
  validateInquiryId,
  validateInquiryStatusUpdate,
};
