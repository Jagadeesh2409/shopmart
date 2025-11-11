const express = require('express');
const router = express.Router();
const { createValidator } = require('express-joi-validation');
const validator = createValidator({passError: true });

const productController = require('../controllers/productController');
const {
  createProductSchema,
  updateProductSchema,
} = require('../utils/validation');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', validator.body(createProductSchema), productController.createProduct);
router.put('/:id', validator.body(updateProductSchema), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
