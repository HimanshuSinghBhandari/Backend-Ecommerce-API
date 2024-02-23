const express = require('express');
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express()

app.use(bodyParser.json());
app.use(cookieParser());

//middleware for aurhentication
app.use(passport.initialize());
app.use(passport.session());

// Port
const PORT  = process.env.PORT || 3000;

//Server
app.listen(PORT , () => console.log(`Server listening on port ${PORT}`));