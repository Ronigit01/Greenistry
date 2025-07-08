
const express = require("express")
const router = express.Router();

const {signupController,loginController,logoutController,checkAuthController} = require("../controllers/userAuthController");
const isLoggedin = require("../middleware/isLoggedin");

router.post("/register", signupController);
router.post("/login", loginController)
router.get("/logout",isLoggedin, logoutController);
router.get("/is-auth",isLoggedin, checkAuthController);




module.exports = router