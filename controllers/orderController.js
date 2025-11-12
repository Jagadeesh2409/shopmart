const knex = require("../db/db");
const { SucessResponse, ErrorResponse,response } = require("../utils/response");


const getAllOrders = async (req, res) => {
  const userId = req.user.userId;

  try {
    const orders = await knex("orders")
      .where({ user_id: userId, is_deleted: false })
      .orderBy("created_at", "desc");

    if (!orders.length) {
      return ErrorResponse(res, response.NO_ORDERS_FOUND, 404);
    }

    return SucessResponse(res, orders, response.GET_ORDERS_SUCCESS);
  } catch (error) {
    console.error("Get All Orders Error:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};


const getOrderById = async (req, res) => {
  const userId = req.user.userId;
  const orderId = req.params.id;

  try {
    const order = await knex("orders")
      .where({ id: orderId, user_id: userId, is_deleted: false })
      .first();

    if (!order) {
      return ErrorResponse(res, response.ORDER_NOT_FOUND, 404);
    }

    const orderItems = await knex("order_items").where({ order_id: orderId });

    return SucessResponse(res, { order, items: orderItems }, response.GET_ORDER_SUCCESS);
  } catch (error) {
    console.error("Get Order By ID Error:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};


const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  try {
    const validStatuses = ["Pending", "Paid", "Shipped", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return ErrorResponse(res, response.INVALID_ORDER_STATUS, 400);
    }

    const updated = await knex("orders")
      .where({ id: orderId })
      .update({ status, updated_at: knex.fn.now() });

    if (!updated) {
      return ErrorResponse(res, response.ORDER_NOT_FOUND, 404);
    }

    const updatedOrder = await knex("orders").where({ id: orderId }).first();
    return SucessResponse(res, updatedOrder, response.ORDER_STATUS_UPDATED_SUCCESS);
  } catch (error) {
    console.error("Update Order Status Error:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

//  Soft delete order
const deleteOrderById = async (req, res) => {
  const userId = req.user.userId;
  const orderId = req.params.id;

  try {
    const deleted = await knex("orders")
      .where({ id: orderId, user_id: userId })
      .update({ is_deleted: true, updated_at: knex.fn.now() });

    if (!deleted) {
      return ErrorResponse(res, response.ORDER_NOT_FOUND, 404);
    }

    return SucessResponse(res, null, response.ORDER_DELETED_SUCCESS);
  } catch (error) {
    console.error("Delete Order Error:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrderById,
};
