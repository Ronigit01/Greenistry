
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    name: {
        type: String,
        require: true,
    },

    email:{
        type: String,
        require: true,
    },

    password:{
        type:String,
        require:true,
    },

    cartItems:{
        type: Object,
        default: {},
    }

},{minimize: false}

)  


module.exports = mongoose.model("user",userSchema)