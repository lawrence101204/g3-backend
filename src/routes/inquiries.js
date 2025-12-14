const express = require('express');
const router = express.Router();
const c = require('../controllers/inquiriesController');
const v = require('../validators/inquiryValidators');

/**
 * @openapi
 * /inquiries:
 *   get:
 *     summary: List inquiries (pagination + sorting + status filter)
 */
router.get('/', v.validateInquiryListQuery, c.list);
router.post('/', v.validateInquiryCreate, c.create);
router.put('/:id/status', v.validateInquiryStatusUpdate, c.updateStatus);
router.delete('/:id', v.validateInquiryId, c.remove);

module.exports = router;
