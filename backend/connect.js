const mongoose = require("mongoose");
const connect = async()=>{
    try {
        const connection  = await mongoose.connect("mongodb://localhost:27017/chatapplication_V_2");
        console.log("Connected to DB");
    } catch (error) {
        console.log(error)
    }
  

}
module.exports = connect;
