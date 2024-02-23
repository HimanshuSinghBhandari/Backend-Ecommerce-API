const db = require("../db/db");

//Retrive all product 
const getAllProducts = async () => {
    const query = "SELECT * FROM Products";
    const result = await db.any(query);
    return result;
} 

// create a new product 
const createProduct = async (newProduct) => {
    const { name , price , description } = newProduct;
    const query =
    "INSERT INTO Products (name, price, description) VALUES ($1, $2, $3) RETURNING *";
     const result = await db.one(query, [name, price, description]);
    return result;
}

//Update Product BY ID
const updateProduct = async (productId, updatedProduct) => {
    const { name, price, description } = updatedProduct;
    const query =
      "UPDATE Products SET name = $1, price = $2, description = $3 WHERE product_id = $4 RETURNING *";
    const result = await db.oneOrNone(query, [
      name,
      price,
      description,
      productId,
    ]);
    return result;
  };

  // Delete a product by ID
const deleteProduct = async (productId) => {
    const query = "DELETE FROM Products WHERE product_id = $1 RETURNING *";
    const result = await db.oneOrNone(query, [productId]);
    return result;
  };

  module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
     
  };