const db = require("../db/db");

//retrieve all categories
const getAllCategories = async () => {
    try {
        const query = "SELECT * FROM Categories";
        const result = await db.any(query);
        return result;
    } catch (error) {
        console.error("Query Error:", error);
         throw error;
    }
};

//Retrieve a single categorie
const getCategorieByID = async (categoryID) => {
    try {
        const query = "SELECT * FROM Categories WHERE category_id = $1";
        const result = await db.oneOrNone(query, [categoryID]);
        return result;
    } catch (error) {
        console.error("Query Error:", error);
        throw error;
    }
}

//create a new category
const createCategory = async (newCategory) => {
    try {
        const { category_name } = newCategory;
        const query = "INSERT INTO Categories (category_name) VALUES ($1) RETURNING *";
        const result = await db.one(query , [category_name]);
        return result;
    } catch (error) {
        console.error("Query error:" , error);
        throw error;
    }
}

//Update category
const updateCategory = async (categoryID , UpdatedCategory) => {
    try {
        const { category_name } = updatedCategory;
        const query =
          "UPDATE Categories SET category_name = $1 WHERE category_id = $2 RETURNING *";
        const result = await db.one(query, [category_name, categoryId]);
        return result;
      } catch (error) {
        console.error("Query Error:", error);
        throw error;
      }
}

// Delete a category by ID
const deleteCategory = async (categoryId) => {
    try {
      const query = "DELETE FROM Categories WHERE category_id = $1 RETURNING *";
      const result = await db.one(query, [categoryId]);
      return result;
    } catch (error) {
      console.error("Query Error:", error);
      throw error;
    }
  }

  module.exports = {
    getAllCategories,
    getCategorieByID,
    createCategory,
    updateCategory,
    deleteCategory
  }
