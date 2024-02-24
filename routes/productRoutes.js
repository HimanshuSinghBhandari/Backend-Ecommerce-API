const express = require("express");
const router = express.Router();
const ProductController = require("../controller/productController");

router.get("/", ProductController.getAllProducts);

router.post("/", ProductController.createProduct);

router.get("/:productId", ProductController.getProductById);

router.put("/:productId", ProductController.updateProductById);

router.delete("/:productId", ProductController.deleteProductById);

module.exports = router;