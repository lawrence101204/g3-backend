const { body, param, query } = require('express-validator');
const { handleValidation } = require('./common');

const validateToursListQuery = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('minPrice').optional().isFloat({ min: 0 }),
  query('maxPrice').optional().isFloat({ min: 0 }),
  handleValidation,
];

const validateTourId = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
  handleValidation,
];

const validateTourCreate = [
  body('name').trim().notEmpty().withMessage('name is required').isLength({ max: 200 }),
  body('description').optional().trim().isLength({ max: 5000 }),
  body('price').isFloat({ min: 0 }).withMessage('price must be >= 0'),
  handleValidation,
];

const validateTourUpdate = [
  param('id').isInt({ min: 1 }),
  body('name').optional().trim().isLength({ min: 1, max: 200 }),
  body('description').optional().trim().isLength({ max: 5000 }),
  body('price').optional().isFloat({ min: 0 }),
  handleValidation,
];

module.exports = {
  validateToursListQuery,
  validateTourId,
  validateTourCreate,
  validateTourUpdate,
};