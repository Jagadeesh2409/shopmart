const knex = require("../db/db");
const { SucessResponse, ErrorResponse, response } = require("../utils/response");
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

    let totalPrice = 0;

    // 2️⃣ Fetch discounts for all products in cart
    const productIds = cartItems.map((item) => item.product_id);
    const discounts = await knex("discounts")
      .whereIn("product_id", productIds)
      .andWhere("is_deleted", false)
      .andWhere(function () {
        this.where("start_date", "<=", knex.fn.now())
            .orWhereNull("start_date");
      })
      .andWhere(function () {
        this.where("end_date", ">=", knex.fn.now())
            .orWhereNull("end_date");
      });

    // 3️⃣ Calculate totals including discount per item
    const orderItems = cartItems.map((item) => {
      const discount = discounts.find(d => d.product_id === item.product_id);
      let discountAmount = 0;
      let total = parseFloat(item.total_price);

      if (discount) {
        if (discount.discount_type === "PERCENTAGE") {
          discountAmount = (total * parseFloat(discount.percentage || 0)) / 100;
        } else if (discount.discount_type === "FLAT") {
          discountAmount = parseFloat(discount.flat_amount || 0);
        }

        // Ensure discount does not exceed total price
        discountAmount = Math.min(discountAmount, total);
        total -= discountAmount;
      }

      totalPrice += total;

      return {
        order_id: null, // will update after order creation
        product_id: item.product_id,
        name: item.name || `Product-${item.product_id}`,
        quantity: item.quantity,
        price: parseFloat(item.unit_price),
        tax: 0,
        discount: discountAmount,
        total,
      };
    });

    // 4️⃣ Create order
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

    // 5️⃣ Insert order items with orderId
    orderItems.forEach(item => (item.order_id = orderId));
    await knex("order_items").insert(orderItems);

    // 6️⃣ Update product stock
    for (const item of cartItems) {
      await updateStock(item.product_id, item.quantity, "substraction");
    }

    // 7️⃣ Clear cart
    await knex("cart").where({ user_id: userId }).del();

    // 8️⃣ Respond
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
