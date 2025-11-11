const SucessResponse = (res, data, message = "Success") => {
  return res.status(200).json({ message, data });
};
const ErrorResponse = (res, error, statusCode = 500) => {
  return res.status(statusCode).json({ error });
};

const response = {

    ISE:"",

    ALREADY_REGISTERED:"",
    REGISTER_SUCCESS:"",

    USER_NOT_FOUND:"",
    INVALID_LOGIN:"",
    LOGIN_SUCCESS:"",
    
    PROFILE_GET_SUCCESS:"",
    PROFILE_GET_FAILED:"",

    NO_UNITS_FOUND:"",
    GET_UNITS_SUCCESS:"",
    UNITS_NOT_FOUND:"",
    GET_UNITS_SUCCESS:"",
    UNITS_CREATED_SUCCESS:"",
    UNITS_ALREADY_EXISTS:"",
    UNITS_UPDATED_SUCCESS:"",
    UNITS_DELETED_SUCCESS:"",

   GET_CATEGORIES_SUCCESS:"",
   CATEGORIES_CREATED_SUCCESS:"",
   CATEGORIES_UPDATED_SUCCESS:"",
   CATEGORIES_GET_ERROR:"",
   CATEGORIES_DELETED_SUCCESS:"",

   NO_PRODUCTS_FOUND:"",
   GET_PRODUCTS_SUCCESS:"",
   PRODUCT_CREATED_SUCCESS:"",
   PRODUCT_ALREADY_EXISTS:"",
   PRODUCT_NOT_FOUND:"",
   PRODUCT_UPDATED_SUCCESS:"",
   PRODUCT_DELETED_SUCCESS:"",

   GET_DISCOUNTS_SUCCESS:"",
   DISCOUNT_CREATED_SUCCESS:"",
   DISCOUNT_NOT_FOUND:"",
   DISCOUNT_DELETED_SUCCESS:"",
   DISCOUNT_UPDATED_SUCCESS:"",

};

module.exports = { SucessResponse, ErrorResponse, response };
