const express = require('express')
require("dotenv").config();

const app = express()

// Port
const PORT  = process.env.PORT || 3000;

//Server
app.listen(PORT , () => console.log(`Server listening on port ${PORT}`));