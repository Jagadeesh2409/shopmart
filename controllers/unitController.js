const db = require('../db/db');
const { ErrorResponse, SucessResponse, response } = require('../utils/response');

const getAllUnits = async (req, res) => {
  try {
    const units = await db('units').where({ is_deleted: false });
    if (!units.length) {
      return SucessResponse(res, [], response.NO_UNITS_FOUND);
    }
    return SucessResponse(res, units, response.GET_UNITS_SUCCESS);
  } catch (error) {
    ErrorResponse(res, response.ISE, 500);
  }
};

const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await db('units').where({ id, is_deleted: false }).first();
    if (!unit) {
      return SucessResponse(res, null, response.UNITS_NOT_FOUND);
    }
    return SucessResponse(res, unit, response.GET_UNITS_SUCCESS);
  } catch (error) {
    ErrorResponse(res, response.ISE, 500);
  }
};

const createUnit = async (req, res) => {
  try {
    const unitData = req.body;
    const [newUnitId] = await db('units').insert(unitData);
    const newUnit = await db('units').where({ id: newUnitId }).first();
    return SucessResponse(res, newUnit, response.UNITS_CREATED_SUCCESS);
  } catch (error) {
    console.error(error);
    if (error.code === 'SQLITE_CONSTRAINT' || error.code === 'ER_DUP_ENTRY') {
      return ErrorResponse(res, response.UNITS_ALREADY_EXISTS, 400);
    }
    ErrorResponse(res, response.ISE, 500);
  }
};

const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const unitData = req.body;

    const rowsAffected = await db('units')
      .where({ id })
      .update({ ...unitData, updated_at: db.fn.now() });

    if (!rowsAffected) {
      return ErrorResponse(res, response.UNITS_NOT_FOUND, 404);
    }

    const updatedUnit = await db('units').where({ id }).first();
    return SucessResponse(res, updatedUnit, response.UNITS_UPDATED_SUCCESS);
  } catch (error) {
    console.error(error);
    ErrorResponse(res, response.ISE, 500);
  }
};

const deleteUnitById = async (req, res) => {
  try {
    const { id } = req.params;

    const rowsAffected = await db('units')
      .where({ id })
      .update({ is_deleted: true, updated_at: db.fn.now() });

    if (!rowsAffected) {
      return ErrorResponse(res, response.UNITS_NOT_FOUND, 404);
    }

    return SucessResponse(res, null, response.UNITS_DELETED_SUCCESS);
  } catch (error) {
    ErrorResponse(res, response.ISE, 500);
  }
};

module.exports = {
  createUnit,
  getAllUnits,
  deleteUnitById,
  updateUnit,
  getUnitById,
};
