const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({ passError: true });

const {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddressById,
} = require('../controllers/addressController');

const {
  createAddressSchema,
  updateAddressSchema,
} = require('../utils/validation/addressValidation');

router.get('/', getAllAddresses);
router.get('/:id', getAddressById);
router.post('/', validator.body(createAddressSchema), createAddress);
router.put('/:id', validator.body(updateAddressSchema), updateAddress);
router.delete('/:id', deleteAddressById);

module.exports = router;
