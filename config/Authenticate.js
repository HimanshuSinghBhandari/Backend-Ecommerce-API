const db = require("../db/db");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Authenticate a user
const authenticateUser = async (email, password , done) => {
    console.log(email);
    try {
        const user = await db.oneOrNone("SELECT * FROM Users WHERE email = $1", [
            email,
        ]);

        if(!user)
        {
            return done(null, false, {message : "No user with that email. "});
        }

        const isPasswordaVlid = await bcrypt.compare(password , user.password);

        if(isPasswordaVlid)
        { console.log("Authentication successful");

        //Generate a JWT token
        const token = jwt.sign({user_id: user.user_id,user});

        //return token along with the user 
        return done(null , {user , token});
    } else 
    {
        return done(null, false, {message: "Password Incorrect "});
    }
    } catch (error) {
        console.error("Authentication error:", error);
        return done(error);
    }
};

const blacklistedTokens = new Set();

const isTokenBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

const ensureAuthenticated = (req, res , next) => {

    if(req.user) {
        console.log('user already authenticated:' , req.user);
        return next();
    }

    const authorizationHeader = req.headers.authorization;

    if(!authorizationHeader)
    {
        console.log('token not provided or malformed');
        return res.status(401).json({message : "Unauthorized"});
    }


//extract the token
const token = authorizationHeader.split(' ')[1];
console.log('Toekn before verification ', token);

//verify the token
jwt.verify(token, process.env,SESSION_SECRET, async (err , decoded) => {
    if(err)
    {
        return res.status(401).json({message : 'Unauthorized , Token verification failed'});
    }

    console.log('decoded token:' , decoded);

    // Check if the token is blacklisted
    if (isTokenBlacklisted(token)) {
        console.log('Token is blacklisted.');
        return res.status(401).json({ message: 'Token revoked' });
    }

    try {
        // Retrieve the user from the database using the user_id from the token
        const user = await UserModel.getUserById(decoded.user_id);
  
        if (!user) {
          console.log('User not found.');
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        // Attach the user object to the request
        req.user = user;
  
        console.log('User authenticated successfully:', req.user);
  
        // Continue with the next middleware or route handler
        next();
      } catch (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
})
}

module.exports = {ensureAuthenticated,authenticateUser , isTokenBlacklisted , blacklistedTokens};