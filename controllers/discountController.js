const db = require('../db/db');
const { ErrorResponse, SucessResponse, response } = require('../utils/response');
const _ =  require('lodash')

//  Get all discounts
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await db('discounts').where({ is_deleted: false });
    return SucessResponse(res, discounts, response.GET_DISCOUNTS_SUCCESS);
  } catch (error) {
    ErrorResponse(res, response.ISE, 500, error);
  }
};

// Create discount
const createDiscount = async (req, res) => {
  try {
    const discountData = req.body;
    discountData.slug = _.kebabCase(
      `${discountData.product_id}-${discountData.discount_type}-${discountData.percentage || discountData.flat_amount}-${discountData.start_date}`
    );
    const existing = await db("discounts").where({ slug: discountData.slug, is_deleted: false }).first();
    if (existing) {
      return ErrorResponse(res, response.DISCOUNT_ALREADY_EXISTS, 400);
    }
    const [newDiscountId] = await db("discounts").insert(discountData);
    const newDiscount = await db("discounts").where({ id: newDiscountId }).first();
    return SucessResponse(res, newDiscount, response.DISCOUNT_CREATED_SUCCESS);

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY" || error.code === "SQLITE_CONSTRAINT") {
      return ErrorResponse(res, response.DISCOUNT_ALREADY_EXISTS, 400);
    }
    console.error("Create Discount Error:", error);
    return ErrorResponse(res, response.ISE, 500, error);
  }
};

// Update discount
const updateDiscount = async (req, res) => {
  try {
    const discountId = req.params.id;
    const discountData = req.body;

    await db('discounts').where({ id: discountId }).update(discountData);
    const updatedDiscount = await db('discounts').where({ id: discountId }).first();

    if (!updatedDiscount) {
      return ErrorResponse(res, response.DISCOUNT_NOT_FOUND, 404);
    }

    return SucessResponse(res, updatedDiscount, response.DISCOUNT_UPDATED_SUCCESS);
  } catch (error) {
    
    if (error.code === "ER_DUP_ENTRY" || error.code === "SQLITE_CONSTRAINT") {
      return ErrorResponse(res, response.DISCOUNT_ALREADY_EXISTS, 400);
    }
    ErrorResponse(res, response.ISE, 500, error);
  }
};

// Soft delete discount
const deleteDiscountById = async (req, res) => {
  try {
    const discountId = req.params.id;

    const deleted = await db('discounts')
      .where({ id: discountId })
      .update({ is_deleted: true });

    if (!deleted) {
      return ErrorResponse(res, response.DISCOUNT_NOT_FOUND, 404);
    }

    return SucessResponse(res, null, response.DISCOUNT_DELETED_SUCCESS);
  } catch (error) {
    ErrorResponse(res, response.ISE, 500, error);
  }
};

//  Get discount by ID
const getDiscountById = async (req, res) => {
  try {
    const discountId = req.params.id;
    const discount = await db('discounts')
      .where({ id: discountId, is_deleted: false })
      .first();

    if (!discount) {
      return ErrorResponse(res, response.DISCOUNT_NOT_FOUND, 404);
    }

    return SucessResponse(res, discount, response.GET_DISCOUNTS_SUCCESS);
  } catch (error) {
    ErrorResponse(res, response.ISE, 500, error);
  }
};

module.exports = {
  getAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscountById,
  getDiscountById,
};
