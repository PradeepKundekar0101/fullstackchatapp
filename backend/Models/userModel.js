const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
   username:{
    type:String,
    trim:true,
    required:true
   },
   email:{
    type:String,
    trim:true,
    required:true
   },
   password:{
    type: String,
    required:true
   },
   profile:{
    type:String,
    default:"https://thumbs.dreamstime.com/b/user-vector-icon-filled-flat-sign-mobile-concept-web-design-profile-simple-solid-symbol-logo-illustration-pixel-perfect-115941502.jpg"
   }
},{timestamps:true});
const User = mongoose.model("User",UserModel);
module.exports = User;