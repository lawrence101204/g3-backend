const express = require('express');
const router = express.Router();
const c = require('../controllers/toursController');
const v = require('../validators/tourValidators');

/**
 * @openapi
 * /tours:
 *   get:
 *     summary: List tours (pagination + price filters)
 */
router.get('/', v.validateToursListQuery, c.list);
router.post('/', v.validateTourCreate, c.create);
router.get('/:id', v.validateTourId, c.get);
router.put('/:id', v.validateTourUpdate, c.update);
router.delete('/:id', v.validateTourId, c.remove);

module.exports = router;
