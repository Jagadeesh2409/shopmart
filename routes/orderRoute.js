const express = require("express");
const router = express.Router();
const {
  deleteOrderById,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const validator = require("express-joi-validation").createValidator({});

const {
  updateOrderStatusSchema,

} = require("../utils/validation");

router.get("/",  getAllOrders);
router.get("/:id",  getOrderById);
router.put(
  "/:id/status",
  validator.body(updateOrderStatusSchema),
  updateOrderStatus
);
router.delete("/:id",  deleteOrderById);

module.exports = router;
