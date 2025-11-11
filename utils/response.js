const SucessResponse = (res, data, message = "Success") => {
  return res.status(200).json({ message, data });
};
const ErrorResponse = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error });
};

const response = {
  ISE: "Internal Server Error.",

  // Auth
  ALREADY_REGISTERED: "User already registered.",
  REGISTER_SUCCESS: "User registered successfully.",
  USER_NOT_FOUND: "User not found.",
  INVALID_LOGIN: "Invalid login credentials.",
  LOGIN_SUCCESS: "Login successful.",

  // Profile
  PROFILE_GET_SUCCESS: "Profile retrieved successfully.",
  PROFILE_GET_FAILED: "Failed to retrieve profile.",

  // Units
  NO_UNITS_FOUND: "No units found.",
  GET_UNITS_SUCCESS: "Units retrieved successfully.",
  UNITS_NOT_FOUND: "Unit not found.",
  UNITS_CREATED_SUCCESS: "Unit created successfully.",
  UNITS_ALREADY_EXISTS: "Unit already exists.",
  UNITS_UPDATED_SUCCESS: "Unit updated successfully.",
  UNITS_DELETED_SUCCESS: "Unit deleted successfully.",

  // Categories
  GET_CATEGORIES_SUCCESS: "Categories retrieved successfully.",
  CATEGORIES_CREATED_SUCCESS: "Category created successfully.",
  CATEGORIES_UPDATED_SUCCESS: "Category updated successfully.",
  CATEGORIES_GET_ERROR: "Failed to retrieve categories.",
  CATEGORIES_DELETED_SUCCESS: "Category deleted successfully.",

  // Products
  NO_PRODUCTS_FOUND: "No products found.",
  GET_PRODUCTS_SUCCESS: "Products retrieved successfully.",
  PRODUCT_CREATED_SUCCESS: "Product created successfully.",
  PRODUCT_ALREADY_EXISTS: "Product already exists.",
  PRODUCT_NOT_FOUND: "Product not found.",
  PRODUCT_UPDATED_SUCCESS: "Product updated successfully.",
  PRODUCT_DELETED_SUCCESS: "Product deleted successfully.",

  // Discounts
  GET_DISCOUNTS_SUCCESS: "Discounts retrieved successfully.",
  DISCOUNT_CREATED_SUCCESS: "Discount created successfully.",
  DISCOUNT_NOT_FOUND: "Discount not found.",
  DISCOUNT_DELETED_SUCCESS: "Discount deleted successfully.",
  DISCOUNT_UPDATED_SUCCESS: "Discount updated successfully.",

  // Cart
  GET_CART_ITEMS_SUCCESS: "Cart items retrieved successfully.",
  CART_ITEM_ADDED_SUCCESS: "Item added to cart successfully.",
  CART_ITEM_NOT_FOUND: "Cart item not found.",
  CART_ITEM_UPDATED_SUCCESS: "Cart item updated successfully.",
  CART_ITEM_DELETED_SUCCESS: "Cart item deleted successfully.",

  // 📍 Address
  GET_ADDRESS_SUCCESS: "Address retrieved successfully.",
  ADDRESS_NOT_FOUND: "Address not found.",
  ADDRESS_GET_FAILED: "Failed to retrieve address.",
  ADDRESS_CREATED_SUCCESS: "Address created successfully.",
  ADDRESS_CREATED_FAILED: "Failed to create address.",
  ADDRESS_UPDATED_SUCCESS: "Address updated successfully.",
  ADDRESS_UPDATED_FAILED: "Failed to update address.",
  ADDRESS_DELETED_SUCCESS: "Address deleted successfully.",
  ADDRESS_DELETED_FAILED: "Failed to delete address.",

  // 📦 Pincode
  GET_PINCODES_SUCCESS: "Pincodes retrieved successfully.",
  PINCODE_NOT_FOUND: "Pincode not found.",
  PINCODE_NOT_SERVICEABLE: "This pincode is not serviceable.",
  PINCODE_ALREADY_EXISTS: "Pincode already exists.",
  PINCODE_CREATED_SUCCESS: "Pincode added successfully.",
  PINCODE_CREATED_FAILED: "Failed to add pincode.",
  PINCODE_UPDATED_SUCCESS: "Pincode updated successfully.",
  PINCODE_UPDATED_FAILED: "Failed to update pincode.",
  PINCODE_DELETED_SUCCESS: "Pincode deleted successfully.",
  PINCODE_DELETED_FAILED: "Failed to delete pincode.",

  CHECKOUT_SUCCESS: "Order placed successfully.",
  CART_EMPTY: "Your cart is empty.",

  NO_ORDERS_FOUND: "No orders found.",
  GET_ORDERS_SUCCESS: "Orders fetched successfully.",
  GET_ORDER_SUCCESS: "Order details fetched successfully.",
  ORDER_NOT_FOUND: "Order not found.",
  ORDER_DELETED_SUCCESS: "Order deleted successfully.",
  INVALID_ORDER_STATUS: "Invalid order status provided.",
  ORDER_STATUS_UPDATED_SUCCESS: "Order status updated successfully.",
};

module.exports = { SucessResponse, ErrorResponse, response };
