const express = require('express');
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const pool = require("./db/db")
const { ensureAuthenticated } = require("./config/Authenticate");

// Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

require("dotenv").config();

const app = express()

app.use(bodyParser.json());
app.use(cookieParser());

//middleware for aurhentication
app.use(passport.initialize());
app.use(passport.session());

// Middleware for logging and session handling
app.use((req, res, next) => {
    console.log("Request:", req.method, req.url);
    console.log("Session before route:", req.session);
    next();
  });

  app.use("/auth", authRoutes);
  app.use("/users", userRoutes);
  app.use("/dashboard", dashboardRoutes);
  app.use("/products", productRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/orders", orderRoutes);
  app.use("/carts", ensureAuthenticated, cartRoutes);

  // Additional routes
app.use((req, res) => {
    res.status(404).send("Not Found");
  });

// Error handling
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
      error: {
        status,
        message: err.message || "Internal Server Error",
      },
    });
  });
  

// Port
const PORT  = process.env.PORT || 3000;

//Server
app.listen(PORT , () => console.log(`Server listening on port ${PORT}`));