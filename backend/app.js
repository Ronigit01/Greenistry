
const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors")
const dotenv = require("dotenv");
const db = require("./config/mongoose")
const authRouter = require("./routes/authRoutes")
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const cookieParser = require("cookie-parser")
const {connectCloudinaty} = require("./config/cloudinary")
db();

dotenv.config()
app.use(cors({
    origin: "https://greenistry.netlify.app", //frontend URL
    credentials: true
  }))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
express.static(path.join(__dirname, "public"))



app.use("/images", express.static("public/uploads"))
app.use("/api/user",authRouter);
app.use("/api/seller",sellerRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/address", addressRoutes);

const PORT = process.env.PORT || 10000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
