
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
require("dotenv").config()


app.use(cookieParser())

const  isSellerLogin = (req,res,next) =>{
   try{

       if(!req.cookies.sellerToken){
           res.status(401).json({message:"you must be logged in"})
       }else{

           let data  = jwt.verify(req.cookies.sellerToken, process.env.JWT_SECRET)
           if(data.email === process.env.SELLER_EMAIL ){
            next();
           }
       }

   }catch(err){
    console.log(err)
    res.json({err})
   }

}


module.exports = isSellerLogin;