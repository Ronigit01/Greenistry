
const productModel = require("../model/product")
const orderModel = require("../model/order")
const stripe =  require("stripe")


// Place order COD: /api/order/place

module.exports.pleaceOrderController = async (req,res) => {

    try{

        const userId = req.user.id;
        const{items,address} = req.body;

        console.log(items)
        if(!address || !items || items.length === 0 ){
            return res.status(500).json({message:"all fields are required"})
        }
    
        // calculate amount
       
        let amount = await items.reduce(async(a,item)=>{
            let product = await productModel.findById(item.product)
            console.log("product",product.offerPrice * item.quantity)
            return  a + product.offerPrice * item.quantity;
        },0)

        let addGst = amount * 0.02;
        let finalAmount = amount+ addGst ;
    
        
    
        let order = await orderModel.create({
            userId,
            items,
            amount:finalAmount,
            address,
            paymentType:"COD",
            isPaid: false,
    
        })
    
        
        res.status(200).json({message:"order placed successfully" , success:true})

    }catch(err){
        console.log(err.message)
        res.status(500).json({message:"internal server error" , error: err.message})
    }

}
// Place order stripe: /api/order/stripe

module.exports.pleaceOrderStripeController = async (req,res) => {

    try{

        const userId = req.user.id;
        const{items,address} = req.body;
        const {origin} = req.headers;
        console.log(items)
        if(!address || !items || items.length === 0 ){
            return res.status(500).json({message:"all fields are required"})
        }
        
        let productData = []
        // calculate amount
       
        let amount = await items.reduce(async(a,item)=>{
            let product = await productModel.findById(item.product)
            productData.push({
              name:product.name,
              price:product.offerPrice,
              quantity:item.quantity,
            })
            // console.log("product",product.offerPrice * item.quantity)
            return  a + product.offerPrice * item.quantity;
        },0)

        let addGst = amount * 0.02;
        let finalAmount = amount+ addGst ;
    
        let order = await orderModel.create({
            userId,
            items,
            amount:finalAmount,
            address,
            paymentType:"Online",
            isPaid: true,
    
        })

        //stripe gateway 

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        
        //create
        const line_items = productData.map((item)=>{
          return {
            price_data:{
              currency:"usd",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.floor(item.price*item.price*0.02)*100
            },
            quantity: item.quantity,
          }
        })
        
        //create session
        const session = await stripeInstance.checkout.sessions.create({
          line_items,
          mode:"payment",
          success_url:`${origin}/my-orders`,
          cancel_url:`${origin}/cart`,
          metadata:{
            orderId: order._id.toString(),
            userId,
          }
        })
        
        res.status(200).json({message:"order placed successfully" , success:true,url:session.url})

    }catch(err){
        console.log(err.message)
        res.status(500).json({message:"internal server error" , error: err.message})
    }

}

 


// oredr details for individual user :/api/order/user

module.exports.getUsersOrderController = async (req,res) => {

    try{

        const userId = req.user.id;
     
        const orders = await orderModel.find({
         userId,
         $or: [{paymentType:"COD"},{isPaid:true}]
     
        })
        .populate("items.product")
        .populate("address")
        .sort({createdAt: -1})

        console.log(orders)
        res.status(200).json({success:true, orders})

    }catch(err){
        console.log(err.message)
        res.status(500).json({message:"internal server error" , error: err.message})
    }
}




// get all orders for admin :/api/order/all


module.exports.getAllOrdersController = async (req,res) => {

    try {
        
        const allOrders = await orderModel.find({
            $or: [{paymentType:"COD"},{isPaid:true}]
        })
        .populate("items.product address")
        .sort({createdAt: -1})

        console.log(allOrders)
        res.status(200).json({success:true, allOrders})

    } catch (err) {

        console.log(err)
        res.status(500).json({message:"internal server error" , error: err.message})
        
    }
}


