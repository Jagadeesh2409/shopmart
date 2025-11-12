const express = require('express');
const router = express.Router();
const { createValidator } = require('express-joi-validation');
const validator = createValidator({passError:true});

const discountController = require('../controllers/discountController');
const {
  createDiscountSchema,
  updateDiscountSchema,
} = require('../utils/validation');

router.get('/', discountController.getAllDiscounts);
router.get('/:id', discountController.getDiscountById);
router.post('/', validator.body(createDiscountSchema), discountController.createDiscount);
router.put('/:id', validator.body(updateDiscountSchema), discountController.updateDiscount);
router.delete('/:id', discountController.deleteDiscountById);

module.exports = router;
