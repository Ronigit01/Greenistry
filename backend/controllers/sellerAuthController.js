const generateToken = require("../utils/generateToken");

require("dotenv").config();

module.exports.sellerLoginController = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      const token = generateToken({ email });
      // res.cookie("sellerToken", token);
      res.cookie("sellerToken",token,{
                    httpOnly: true,
                    secure: true,           
                    sameSite: 'None',      
                    maxAge: 24 * 60 * 60 * 1000 // 1 day
                });
      res
        .status(200)
        .json({ message: "seller login successful", success: true });
    } else {
      res
        .status(200)
        .json({ message: "incorrect credientials", success: false });
    }
  } catch (err) {
    res.status(500).json({ message: "internal server error", success: false });
  }
};

module.exports.sellerLogoutController = (req, res) => {
  try {
    res.clearCookie("sellerToken");
    res.status(200).json({ message: "seller logout successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
