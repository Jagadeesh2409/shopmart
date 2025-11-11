const db =  require('../db/db');
const {ErrorResponse,SucessResponse,response} = require('../utils/response');

const getAllCategories = async (req, res) => {
    try {
        const categories = await db('categories').where({is_deleted:false});
        return SucessResponse(res, categories, response.GET_CATEGORIES_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.ISE, 500);
    }

};

const createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const [newCategoryId] = await db('categories').insert(categoryData);
        const newCategory = await db('categories').where({ id: newCategoryId }).first();
        return SucessResponse(res, newCategory, response.CATEGORIES_CREATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.ISE, 500);
    }
};


const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryData = req.body;
        await db('categories').where({ id: categoryId }).update(categoryData);
        const updatedCategory = await db('categories').where({ id: categoryId }).first();
        return SucessResponse(res, updatedCategory, response.CATEGORIES_UPDATED_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.ISE, 500);
    }
};

const deleteCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await db('categories').where({ id: categoryId }).update({ is_deleted: true });
        return SucessResponse(res, null, response.CATEGORIES_DELETED_SUCCESS);
    }
    catch (error) {
        ErrorResponse(res, response.ISE, 500);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await db('categories').where({ id: categoryId }).andWhere({is_deleted: false}).first();
        if (!category) {
            return SucessResponse(res, null, response.CATEGORIES_GET_ERROR);
        }
        return SucessResponse(res, category, response.GET_CATEGORIES_SUCCESS);
    } catch (error) {
        ErrorResponse(res, response.ISE, 500);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategoryById,
    getCategoryById,
};