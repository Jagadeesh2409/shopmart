const db = require('../db/db');
const { SuccessResponse, ErrorResponse, response } = require('../utils/response');
const _ = require('lodash');

//  Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await db('products').where({ is_deleted: false });

    if (!products.length) {
      return SuccessResponse(res, [], response.NO_PRODUCTS_FOUND);
    }

    return SuccessResponse(res, products, response.GET_PRODUCTS_SUCCESS);
  } catch (error) {
    console.error('Error fetching products:', error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

//  Create product
const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    productData.slug = _.kebabCase(productData.name);

    const [newProductId] = await db('products').insert(productData);
    const newProduct = await db('products').where({ id: newProductId }).first();

    return SuccessResponse(res, newProduct, response.PRODUCT_CREATED_SUCCESS);
  } catch (error) {
    console.error('Error creating product:', error);

    if (error.code === 'ER_DUP_ENTRY' || error.code === 'SQLITE_CONSTRAINT') {
      return ErrorResponse(res, response.PRODUCT_ALREADY_EXISTS, 400);
    }

    return ErrorResponse(res, response.ISE, 500);
  }
};

//  Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    await db('products').where({ id }).update({
      ...productData,
      updated_at: db.fn.now(),
    });

    const updatedProduct = await db('products').where({ id }).first();

    if (!updatedProduct) {
      return ErrorResponse(res, response.PRODUCT_NOT_FOUND, 404);
    }

    return SuccessResponse(res, updatedProduct, response.PRODUCT_UPDATED_SUCCESS);
  } catch (error) {
    console.error('Error updating product:', error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

// Soft delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db('products').where({ id }).update({ is_deleted: true });

    if (!result) {
      return ErrorResponse(res, response.PRODUCT_NOT_FOUND, 404);
    }

    return SuccessResponse(res, null, response.PRODUCT_DELETED_SUCCESS);
  } catch (error) {
    console.error('Error deleting product:', error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db('products')
      .where({ id, is_deleted: false })
      .first();

    if (!product) {
      return ErrorResponse(res, response.PRODUCT_NOT_FOUND, 404);
    }

    return SuccessResponse(res, product, response.GET_PRODUCTS_SUCCESS);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
