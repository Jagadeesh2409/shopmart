const knex = require("../db/db");
const { SucessResponse, ErrorResponse,response } = require("../utils/response");

const updateStock = require("../controllers/stockController");

const checkout = async (req, res) => {
  const userId = req.user.userId;
  const { shipping_address_id, pincode_id } = req.body;

  try {
    // 1️⃣ Get cart items for this user
    const cartItems = await knex("cart").where({ user_id: userId });
    if (!cartItems || cartItems.length === 0) {
      return ErrorResponse(res, response.CART_EMPTY, 400);
    }

    // 2️⃣ Calculate totals
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += parseFloat(item.total_price);
    });

    // 3️⃣ Create order
    const invoiceNo = `INV-${Date.now()}`;
    const [orderId] = await knex("orders").insert({
      invoice_no: invoiceNo,
      user_id: userId,
      quantity: cartItems.length,
      payment_method: "Cash on Delivery",
      payment_status: "Pending",
      pincode_id,
      total_price: totalPrice,
      shipping_address: shipping_address_id,
      status: "Pending",
    });

    // 4️⃣ Insert into order_items
    const orderItems = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.product_id,
      name: item.name || `Product-${item.product_id}`,
      quantity: item.quantity,
      price: item.unit_price,
      tax: 0,
      discount: 0,
      total: item.total_price,
    }));

    await knex("order_items").insert(orderItems);

    // 5️⃣ Update product stock
    for (const item of cartItems) {
      await updateStock(item.product_id, item.quantity, "substraction");
    }

    // 6️⃣ Clear cart
    await knex("cart").where({ user_id: userId }).del();

    // 7️⃣ Respond
    return SucessResponse(
      res,
      { order_id: orderId, invoice_no: invoiceNo, total_price: totalPrice },
      response.CHECKOUT_SUCCESS
    );
  } catch (error) {
    console.error("Checkout Error:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

module.exports = { checkout };
