const bcrypt = require("bcrypt");
const db = require("../db/db");
const passport = require("passport");


// Get All the User
const getAllUsers = async() => {
    try {
        const result = await db.any("SELECT * FROM Users");
        console.log("Query Results:", result);
        return result;
    } catch (error) {
        console.error("Query Error:", error);
         throw error;
    }
};

// Get any User by ID
const getUserByID = async (userId) => {
    try {
        const result = await db.oneOrNone("SELECT * FROM Users WHERE user_id = $1", [userId]);
        return result;
    } catch (error) {
        console.error("Query Error:", error);
        throw error;
    }
}

//CREATE USER 
const createUser = async (username , password , email , first_name , last_name) => {
    try {
        //Hash password
        const hashedpassword = await bcrypt.hash(password, 10);

        //Insert in database
        const result = await db.one(
            "INSERT INTO Users (username, password, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [username, hashedpassword, email, first_name, last_name]
        )

        return result;
    } catch (error) {
        console.error("Query Error:", error);
         throw error;
    }
}

// Delete User
const deleteUser = async (userId) => {
    try {
        const result = await db.one(
            "DELETE FROM Users WHERE user_id = $1 RETURNING *",
            [userId]
        )
        return result;
    } catch (error) {
        console.error("Query Error:", error);
    throw error;
    }
}

//Update Info of the User 
const updateUser = async (userId , updateduser) => {
    try {
        const result = await db.one(
            "UPDATE Users SET username = $1, password = $2, email = $3, first_name = $4, last_name = $5  WHERE user_id = $6 RETURNING *",
      [
        updatedUser.username,
        updatedUser.password,
        updatedUser.email,
        updatedUser.first_name,
        updatedUser.last_name,
        userId,
      ]
    );
    return result;
    } catch (error) {
        console.error("Query Error:", error);
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getUserByID,
    createUser,
    deleteUser,
    updateUser
}