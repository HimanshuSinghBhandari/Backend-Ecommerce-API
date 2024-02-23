const db = require("../db/db");
const uuid4 = require("uuid");

const createOrderInDB = async (order) => {
    try {
      // Insert the order into the orders table
      await db.none(
        "INSERT INTO Orders (order_id, user_id, status, total_price) VALUES ($1::uuid, $2, $3, $4)",
        [order.order_id, order.user_id, order.status, order.total_price]
      );
  
      // No rows are expected to be returned since we used db.none
      return order;
    } catch (error) {
      // Handle errors, log them, or throw an exception
      console.error("Error creating order in the database:", error);
      throw error;
    }
  };


const createOrder = async (cartDetails) => {
    try {
        const order_id = uuid4(); // generating Uniqur Order Id

        const total_price = calculateTotalprice(cartDetails.products);

        //create order object
        const order = {
            order_id,
            user_id: cartDetails.user_id,
            status: "pending",
            total_price,
        }
        //save order in database
        await createOrderInDB(order);

        return order;
    } catch (error) {
        console.error("Error creating order:", error);
    throw error;
    }
}

//Update an existing order
const updateOrder = async (orderId , userId, updatedOrderData) => {
    try {
        const query = `
        UPDATE Orders
        SET status = $1, total_price = $2
        WHERE order_id = $3 AND user_id = $4
      `;

      await db.none(query , [
        updatedOrderData.status,
        updatedOrderData.total_price,
        orderId,
        userId,
      ])

      //check order was updated successfully
      const updatedOrder = await getOrderItemsByOrderId(orderId ,userId)
      return updatedOrder;
    } catch (error) {
        console.error("Error updating order:", error);
    throw error;
    }
}

//function to delete an existing order
const deleteOrder = async (orderId , userId) => {
    try {
        const query = `
          DELETE FROM Orders
          WHERE order_id = $1 AND user_id = $2
        `;
        await db.none(query, [orderId, userId]);
    
        // Check if the order was deleted successfully
        const deletedOrder = await getOrderById(orderId, userId);
        return deletedOrder;
      } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
      }
}

// Function to get all orders for a user
const getAllOrders = async (userId) => {
    try {
      const query = "SELECT * FROM Orders WHERE user_id = $1";
      const result = await db.any(query, [userId]);
      return result;
    } catch (error) {
      console.error("Error retrieving orders from the database:", error);
      throw error;
    }
  };

// Function to get order by ID for a user
const getOrderById = async (orderId, userId) => {
    try {
      const query = "SELECT * FROM Orders WHERE order_id = $1 AND user_id = $2";
      const result = await db.oneOrNone(query, [orderId, userId]);
      return result;
    } catch (error) {
      console.error("Error retrieving order from the database:", error);
      throw error;
    }
  };

module.exports = {
    createOrder,
    createOrderInDB,
     getAllOrders,
     getOrderById,
     updateOrder,
     deleteOrder,
};



