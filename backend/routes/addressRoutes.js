
const express = require("express");
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
const { addAddressController, getAddressController } = require("../controllers/addressController");


router.post("/add", isLoggedin, addAddressController)
router.get("/get" , isLoggedin, getAddressController)

module.exports = router;