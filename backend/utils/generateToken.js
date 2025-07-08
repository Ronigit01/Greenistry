

const jwt = require("jsonwebtoken")
require("dotenv").config();

const generateToken = (data) =>{
    try {
        
        return jwt.sign(data,process.env.JWT_SECRET)

    } catch (err) {
        
        console.log(err)
    }
}

module.exports = generateToken