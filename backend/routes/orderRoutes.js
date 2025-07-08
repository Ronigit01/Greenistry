
const express = require("express");
const router = express.Router();
const { pleaceOrderController, getUsersOrderController, getAllOrdersController,pleaceOrderStripeController } = require("../controllers/orderController");
const isLoggedin = require("../middleware/isLoggedin");
const isSellerLogin = require("../middleware/isSellerLogin");


router.post("/place" , isLoggedin, pleaceOrderController)
router.post("/stripe" , isLoggedin, pleaceOrderStripeController)
router.get("/user",isLoggedin, getUsersOrderController)
router.get("/seller",isSellerLogin, getAllOrdersController)


module.exports = router