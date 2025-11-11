const db = require('../db/db');
const { ErrorResponse, SucessResponse, response } = require('../utils/response');

const createAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressData = { ...req.body, user_id: userId };

    const [newAddressId] = await db('user_addresses').insert(addressData);
    const newAddress = await db('user_addresses').where({ id: newAddressId }).first();

    return SucessResponse(res, newAddress, response.ADDRESS_CREATED_SUCCESS);
  } catch (error) {
    console.error("Error in createAddress:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

const getAllAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addresses = await db('user_addresses').where({ user_id: userId });

    return SucessResponse(res, addresses, response.GET_ADDRESS_SUCCESS);
  } catch (error) {
    console.error("Error in getAllAddresses:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

const getAddressById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = req.params.id;

    const address = await db('user_addresses')
      .where({ id: addressId, user_id: userId })
      .first();

    if (!address) {
      return ErrorResponse(res, response.ADDRESS_NOT_FOUND, 404);
    }

    return SucessResponse(res, address, response.GET_ADDRESS_SUCCESS);
  } catch (error) {
    console.error("Error in getAddressById:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

const updateAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = req.params.id;

    const updated = await db('user_addresses')
      .where({ id: addressId, user_id: userId })
      .update(req.body);

    if (!updated) {
      return ErrorResponse(res, response.ADDRESS_NOT_FOUND, 404);
    }

    const updatedAddress = await db('user_addresses')
      .where({ id: addressId })
      .first();

    return SucessResponse(res, updatedAddress, response.ADDRESS_UPDATED_SUCCESS);
  } catch (error) {
    console.error("Error in updateAddress:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

const deleteAddressById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = req.params.id;

    const deleted = await db('user_addresses')
      .where({ id: addressId, user_id: userId })
      .del();

    if (!deleted) {
      return ErrorResponse(res, response.ADDRESS_NOT_FOUND, 404);
    }

    return SucessResponse(res, null, response.ADDRESS_DELETED_SUCCESS);
  } catch (error) {
    console.error("Error in deleteAddressById:", error);
    return ErrorResponse(res, response.ISE, 500);
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddressById,
};
