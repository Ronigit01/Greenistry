
const express = require("express");
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");


const { updateCartController } = require("../controllers/cartController");


router.post("/update",isLoggedin, updateCartController)


module.exports = router