const db = require('../db/db');
const { ErrorResponse, SucessResponse, response } = require('../utils/response');

//  Get all items in the user's cart
const getCartItems = async (req, res) => {
  const userId = req.user.id;
  try {
    const cartItems = await db('cart')
      .where({ user_id: userId })
      .join('products', 'cart.product_id', 'products.id')
      .select(
        'cart.id',
        'cart.quantity',
        'cart.unit_price',
        'cart.total_price',
        'products.name as product_name',
        'products.image_url'
      );

    return SucessResponse(res, cartItems, response.GET_CART_ITEMS_SUCCESS);
  } catch (error) {
    console.error(error);
    ErrorResponse(res, response.ISE, 500);
  }
};


//  Add item to cart
const addItemToCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const { product_id, quantity } = req.body;
    //  Fetch product to calculate prices dynamically
    const product = await db('products')
      .where({ id: product_id, is_deleted: false })
      .first();

    if (!product) {
      return ErrorResponse(res, response.PRODUCT_NOT_FOUND, 404);
    }
    const unit_price = product.selling_price;
    const total_price = unit_price * quantity;

    const [newItemId] = await db('cart').insert({
      user_id: userId,
      product_id,
      quantity,
      unit_price,
      total_price,
    });

    const newItem = await db('cart').where({ id: newItemId }).first();
    return SucessResponse(res, newItem, response.CART_ITEM_ADDED_SUCCESS);
  } catch (error) {
    console.error(error);
    ErrorResponse(res, response.ISE, 500);
  }
};

//  Update item quantity in cart
const updateCartItem = async (req, res) => {
  const userId = req.user.userId;
  const itemId = req.params.id;

  try {
    const { quantity } = req.body;

    //  Fetch the current cart item
    const cartItem = await db('cart').where({ id: itemId, user_id: userId }).first();

    if (!cartItem) {
      return ErrorResponse(res, response.CART_ITEM_NOT_FOUND, 404);
    }

    //  Recalculate total_price if quantity updated
    const total_price = quantity ? cartItem.unit_price * quantity : cartItem.total_price;

    await db('cart')
      .where({ id: itemId, user_id: userId })
      .update({ quantity, total_price, updated_at: db.fn.now() });

    const updatedItem = await db('cart').where({ id: itemId }).first();
    return SucessResponse(res, updatedItem, response.CART_ITEM_UPDATED_SUCCESS);
  } catch (error) {
    console.error(error);
    ErrorResponse(res, response.ISE, 500);
  }
};


//  Delete item from cart
const deleteCartItemById = async (req, res) => {
  const userId = req.user.userId;

  try {
    const itemId = req.params.id;
    const deleted = await db('cart').where({ id: itemId, user_id: userId }).del();

    if (!deleted) {
      return ErrorResponse(res, response.CART_ITEM_NOT_FOUND, 404);
    }

    return SucessResponse(res, null, response.CART_ITEM_DELETED_SUCCESS);
  } catch (error) {
    console.error(error);
    ErrorResponse(res, response.ISE, 500);
  }
};

module.exports = {
  getCartItems,
  addItemToCart,
  updateCartItem,
  deleteCartItemById,
};



