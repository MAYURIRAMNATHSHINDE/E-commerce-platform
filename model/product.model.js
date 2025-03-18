const mongoose=require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String
});

const ProductModel=mongoose.model("product",productSchema)


module.exports={ProductModel}