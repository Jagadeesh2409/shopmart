const express = require('express');
const router = express.Router();
const { createValidator } = require('express-joi-validation');
const validator = createValidator({passError: true });

const { createUnitSchema, updateUnitSchema } = require('../utils/validation');
const unitController = require('../controllers/unitController');


router.post('/', validator.body(createUnitSchema), unitController.createUnit);
router.put('/:id', validator.body(updateUnitSchema), unitController.updateUnit);
router.get('/', unitController.getAllUnits);
router.get('/:id', unitController.getUnitById);
router.delete('/:id', unitController.deleteUnitById);

module.exports = router;
