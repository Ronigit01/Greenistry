
const express = require("express");
const router = express.Router();
const sellerLogin = require("../middleware/isSellerLogin")

const { sellerLoginController, sellerLogoutController } = require("../controllers/sellerAuthController");


router.post("/login", sellerLoginController)
router.get("/logout", sellerLogoutController);

module.exports = router