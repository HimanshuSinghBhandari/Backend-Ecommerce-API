const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { ensureAuthenticated } = require("../config/Authenticate");

router.get("/login",authController.getLogin);
router.get("/login" , authController.postLogin);
router.get("/logout" , ensureAuthenticated, authController.logout);

module.exports = router;