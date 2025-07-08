const userModel = require("../model/user")

// update user cartData: /api/cart/update

module.exports.updateCartController = async (req,res) => {
    try {
        
        const userid = req.user.id;
        // if(!userid) return res.ststus(500).json({success:false,message:"you must be login"})
        console.log("userid",userid)
        const {cartItems} = req.body;

        const updateusercart = await userModel.findOneAndUpdate({_id:userid},{cartItems},{new:true})
        if(!updateusercart){
            return res.status(404).json({message:"user not found",success:false})
        } 

        res.status(200).json({success:true,message: "Cart updated", updateusercart})


    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: "Server error", error: err.message,success:false });
    }
}