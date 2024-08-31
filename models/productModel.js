import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    productName : String,
    brandName : String,
    category : String,
    productImage : [],
    description : String,
    price : Number,
    sellingPrice : Number,
    isPopular: { type: Boolean, default: false },

},{
    timestamps : true
})


const productModel = mongoose.model("product",productSchema)

export default productModel