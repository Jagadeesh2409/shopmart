const express = require('express');
const router = express.Router();
const { createValidator } = require('express-joi-validation');
const validator = createValidator({passError: true });

const categoryController = require('../controllers/categoriesController');
const { createCategorySchema, updateCategorySchema } = require('../utils/validation');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', validator.body(createCategorySchema), categoryController.createCategory);
router.put('/:id', validator.body(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategoryById);

module.exports = router;
