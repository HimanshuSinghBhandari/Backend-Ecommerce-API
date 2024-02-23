const db = require("../db/db");

const createCart = async (user_id) => {
    try {
        const query = "INSERT INTO Carts (user_id) VALUES ($1) RETURNING *";
        const result= await db.one(query , [user_id]);
    } catch (error) {
        console.log("Error creating cart:" , error);
        throw error
    }
};

const addProductToCart = async (cartId , productId , quantity) => {
    const query = "INSERT INTO Cart_Items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
    const result = await db.one(query, [cartId, productId, quantity]);
    return result;
}

const getCartDetails = async (cartId) => {
    const query = `
      SELECT 
        Cart_Items.quantity,
        Products.*
      FROM 
        Cart_Items
      JOIN 
        Products ON Cart_Items.product_id = Products.product_id
      WHERE 
        Cart_Items.cart_id = $1
    `;
    const result = await db.any(query, [cartId]);
    return result;
  };

const updateProductQuantityInCart = async (cartId , productId , quantity) => {
    const query = "UPDATE Cart_Items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *";
    const result = await db.oneOrNone(query , [quantity , cartId, productId]);
};

const removeProductFromcart = async (cartId , productId) => {
    const query =  "DELETE FROM Cart_Items WHERE cart_id = $1 AND product_id = $2 RETURNING *";
    const result = await db.oneOrNone(query , [cartId, productId ]);
    return result;
};

const clearCart = async (cartId) => {
    try {
        const query = "DELETE FROM Cart_Items WHERE cart_id = $1";
        await db.none(query , [cartId]);

        const result = {
            message: "Cart Clearred Suceessfuly",
        };

        return result;
    } catch (error) {
        console.error("Error clearing cart:" , error);
        throw error;
    }
};

module.exports = {
    createCart,
    addProductToCart,
    getCartDetails,
    updateProductQuantityInCart,
    removeProductFromcart,
    clearCart,
};