const express = require('express');
const router = express.Router();
const {
  getAllPincodes,
  getPincodeById,
  createPincode,
  updatePincode,
  deletePincodeById,
} = require('../controllers/pincodeController');

const { createPincodeSchema, updatePincodeSchema } = require('../utils/validation');
const validator = require('express-joi-validation').createValidator({ passError: true });

// Routes
router.get('/', getAllPincodes);
router.get('/:id', getPincodeById);
router.post('/', validator.body(createPincodeSchema), createPincode);
router.put('/:id', validator.body(updatePincodeSchema), updatePincode);
router.delete('/:id', deletePincodeById);

module.exports = router;
