const express = require("express");
const router = express.Router();
const CartController = require("../controller/cartController");

router.post("/create" , CartController.createCart);
router.post("/:cartId/addProduct" , CartController.addProductToCart);
router.get("/:cartId", CartController.getCartDetails);
router.get("/:cartId/updateProduct" , CartController.updateProductQuantityInCart);
router.delete("/:cartId/removeProduct" , CartController.removeProductFromCart);
router.post("/:cartId/checkout" , CartController.checkout);

module.exports = router;