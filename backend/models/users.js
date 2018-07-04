const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

const userSchema = new Schema({
    username:String,
    email:String,
    password:String,
    cart:[{type:Schema.Types.ObjectId,ref:'Product'}],
    products:[{type:Schema.Types.ObjectId,ref:'Product'}]
},{ timestamps:true })

const User = mongoose.model('User',userSchema)

module.exports = { User, userSchema }