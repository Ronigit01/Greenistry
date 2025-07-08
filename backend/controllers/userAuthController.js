
const userModel = require("../model/user")
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const user = require("../model/user");

module.exports.signupController =async (req,res) =>{

    try{
        
        const {name,email, password} = req.body;
    
        if(!name || !email || !password) return res.json({message:"all fields are required"})
    
        const exitinguser = await userModel.findOne({email:email});
    
        if(exitinguser) return res.status(200).json({message:"user already exits ! please login"})
        
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password, salt, async (err,hash)=>{
                const user = await userModel.create({
                    name,
                    email,
                    password:hash,
                })
    
                const token = generateToken({id:user._id, email:email});
                res.cookie("token",token)

                res.json({user,message:"user created successfully",success:true})
            })
            
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({message:"internal server error"})
    }
    
}


module.exports.loginController = async (req,res) =>{


    try{

        
        const {email, password} = req.body;
    
        if(!email || !password) return res.status(200).json({message:"all fields are required",success:false})
    
        const user = await userModel.findOne({email});
        
        if(!user){
            return res.status(200).json({message:"invalid credentials",succes:false})
        }
    
        bcrypt.compare(password,user.password,(err,result)=>{
    
            if(result){
                console.log(user);
                const token = generateToken({id:user._id,email:user.email})
                res.cookie("token",token);
                res.json({user,message:"user login successfully",success:true})
            }
        })

    }catch(err){
        console.log(err)
        return res
          .status(200)
          .json({ message: "internal server error", success: false });
    }


}




module.exports.logoutController = async (req,res) => {
    
    try{

        res.clearCookie("token")
        res.json({message:"user logout successfully", success:true})

    }catch(err){
        console.log(err)
        res.status(500).json({message:"internal server error",success:false});
    }
}


module.exports.checkAuthController = async (req, res) => {

    try{

        const userid = req.user.id;
        
        const user = await userModel.findOne({_id:userid})
        
        if(!user) return res.status(200).json({message:"you must be logged in",success:false})
      
        res.status(200).json({user, succes:true}) 

    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error", success:false});
    }
};