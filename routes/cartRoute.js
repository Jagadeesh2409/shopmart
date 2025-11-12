const express = require("express");
const router = express.Router();
const { createValidator } = require("express-joi-validation");
const validator = createValidator({passError:true});
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

const {authenticateToken} = require('../middleware/authMiddleware')


router.get("/",authenticateToken,getCartItems);
router.post("/", validator.body(createCartSchema),authenticateToken, addItemToCart);
router.put("/:id", validator.body(updateCartSchema),authenticateToken ,updateCartItem);
router.delete("/:id",authenticateToken ,deleteCartItemById);

module.exports = router;
