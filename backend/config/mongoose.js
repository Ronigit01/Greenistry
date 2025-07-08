
const mongoose = require("mongoose")
require("dotenv").config()

const connectDb = () =>{

    try{

        mongoose.connect(process.env.MONGO_URI)
        console.log("database connected");

    }catch(err){
        console.log(err);
        process.exit()
    }
}


module.exports = connectDb