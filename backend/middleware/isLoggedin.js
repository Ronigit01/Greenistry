
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
require("dotenv").config()


app.use(cookieParser())

const isLoggedin = (req,res,next) =>{
    
   try{

       if(!req.cookies.token){
          return res.status(200).json({message:"you must be logged in",success:false})
          
       }else{

           req.user = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
           next();
       }

   }catch(err){
    console.log(err)
    return res.json({message:err.message,success:false})
   }

}


module.exports = isLoggedin