
const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    
    name: {
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },

    price:{
        type:Number,
        required:true,
    },

    offerPrice:{
        type: Number,
        required:true,
    },

    image:{
        type: Array,
        required:true,
    },

    category:{
        type: String,
        require:true,
    },

    inStock:{
        type: Boolean,
        required: true,
        default: true,
    }
})



module.exports = mongoose.model("product",productSchema)