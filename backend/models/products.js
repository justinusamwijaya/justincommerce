const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:String,
    productDescription:String,
    productPrice:Number,
    productPicture:String,
    uploaderId: {type:Schema.Types.ObjectId,ref:'User'}
},{ timestamps:true })

const Product = mongoose.model('Product',productSchema)

module.exports = { Product,productSchema }