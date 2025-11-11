const express = require("express");
const router = express.Router();
const { createValidator } = require("express-joi-validation");
const validator = createValidator({});
const {
  createCartSchema,
  updateCartSchema,
} = require("../utils/validation");
const {
  getCartItems,
  addItemToCart,
  updateCartItem,
  deleteCartItemById,
} = require("../controllers/cartController");


router.get("/", getCartItems);
router.post("/", validator.body(createCartSchema), addItemToCart);
router.put("/:id", validator.body(updateCartSchema), updateCartItem);
router.delete("/:id", deleteCartItemById);

module.exports = router;
