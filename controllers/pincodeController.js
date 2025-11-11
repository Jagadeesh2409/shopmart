const db = require('../db/db');
const { SucessResponse, ErrorResponse, response } = require('../utils/response');

// ✅ Get all pincodes
const getAllPincodes = async (req, res) => {
  try {
    const pincodes = await db('pincodes').whereNotNull('pincode');
    return SucessResponse(res, pincodes, response.GET_PINCODES_SUCCESS);
  } catch (error) {
    return ErrorResponse(res, response.GET_FAILED, 500, error);
  }
};

// ✅ Get single pincode by ID
const getPincodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const pincode = await db('pincodes').where({ id }).first();

    if (!pincode) {
      return ErrorResponse(res, response.PINCODE_NOT_FOUND, 404);
    }

    return SucessResponse(res, pincode, response.GET_PINCODES_SUCCESS);
  } catch (error) {
    return ErrorResponse(res, response.GET_FAILED, 500, error);
  }
};

// ✅ Create a new pincode
const createPincode = async (req, res) => {
  try {
    const [id] = await db('pincodes').insert(req.body);
    const newPincode = await db('pincodes').where({ id }).first();
    return SucessResponse(res, newPincode, response.PINCODE_CREATED_SUCCESS);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return ErrorResponse(res, 'Pincode already exists.', 400);
    }
    return ErrorResponse(res, response.CREATE_FAILED, 500, error);
  }
};

// ✅ Update existing pincode
const updatePincode = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await db('pincodes').where({ id }).update(req.body);

    if (!updated) {
      return ErrorResponse(res, response.PINCODE_NOT_FOUND, 404);
    }

    const updatedPincode = await db('pincodes').where({ id }).first();
    return SucessResponse(res, updatedPincode, response.PINCODE_UPDATED_SUCCESS);
  } catch (error) {
    return ErrorResponse(res, response.UPDATE_FAILED, 500, error);
  }
};

// ✅ Delete pincode by ID
const deletePincodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db('pincodes').where({ id }).del();

    if (!deleted) {
      return ErrorResponse(res, response.PINCODE_NOT_FOUND, 404);
    }

    return SucessResponse(res, null, response.PINCODE_DELETED_SUCCESS);
  } catch (error) {
    return ErrorResponse(res, response.DELETE_FAILED, 500, error);
  }
};

module.exports = {
  getAllPincodes,
  getPincodeById,
  createPincode,
  updatePincode,
  deletePincodeById,
};
