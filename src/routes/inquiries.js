const express = require('express');
const router = express.Router();
const inquiries = require('../controllers/inquiriesController');
const {
  validateInquiriesListQuery,
  validateInquiryCreate,
  validateInquiryStatusUpdate,
} = require('../validators/inquiryValidators');

router.get('/', validateInquiriesListQuery, inquiries.list);
router.post('/', validateInquiryCreate, inquiries.create);
router.put('/:id/status', validateInquiryStatusUpdate, inquiries.updateStatus);

module.exports = router;
