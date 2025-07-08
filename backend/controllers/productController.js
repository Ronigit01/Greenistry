
const cloudinary = require("cloudinary").v2;
const productModel = require("../model/product")

// add product :/api/product/add-product

module.exports.addProductController = async (req,res) => {
    try{

        const {name, description, price , offerPrice , category} = req.body;

        const image = req.files?.map((file)=> file.filename)

        if(!name || !description || !price || !offerPrice || !category || !image || image.length===0){
            return res.status(400).json({message:"all fields are require",success:false})
        }

        let product = await productModel.create({
            name,
            description,
            price,
            offerPrice,
            category,
            image,
        })

        console.log(product)
        res.status(200).json({
            message:"product added successfully",
            product,
            success: true,
        })


    }catch(err){
        console.log(err)
        res.status(500).json({message:"inetnal server error",error:err.message})
    }
}

// get products :/api/product/get-product

module.exports.getProductController = async (req,res) => {
    try {
        
        let allproducts = await productModel.find();
        res.status(200).json({
            success:true,
            allproducts,
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).json({message:"server error",error:err.message})
    }
}


// get single product :/api/product/id

module.exports.getProductByIdController = async (req,res) =>{
   
    try{

        const {id} = req.body;
    
        const product = await productModel.findOne({_id:id})
        if(!product) return res.status(404).json({message: "product not found", success: false})

        res.status(200).json({success:true, product})

    }catch(err){
        console.log(err.message);
        res.status(500).json({ message: "server error", error: err.message });
    }
}



// change stock  :/api/product/stock

module.exports.changeStockController = async (req,res) => {
    try {
        
        const {id, inStock} = req.body;

        const product = await productModel.findOneAndUpdate({_id:id},{inStock},{new:true})
        if(!product) return res.status(404).json({message: "product not found", success: false})

        res.status(200).json({message:"stock update successfully", success:true, product})


    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "server error", error: err.message });
    }
}