const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/categoryController");
const { route } = require("./authRoutes");

router.get("/", CategoryController.getAllCategories);
router.get("/:categoryId", CategoryController.getCategoryById);
router.post("/", CategoryController.createCategory);
router.put("/:categoryId", CategoryController.updateCategoryById);
router.delete("/:categoryId" , CategoryController.deleteCategoryById);

module.exports = router;