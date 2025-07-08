
const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const isSellerLogin = require("../middleware/isSellerLogin");
const { addProductController ,getProductController , getProductByIdController, changeStockController } = require("../controllers/productController");


router.post("/add-product",isSellerLogin , upload.array("image"), addProductController);
router.get("/list" , getProductController);
router.get("/id" , getProductByIdController);
router.post("/stock" , isSellerLogin , changeStockController);


module.exports = router