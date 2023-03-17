const mongoose = require("mongoose");
const MessageModel = mongoose.Schema(
    {
        conversationId:{
            type:String
        },
        senderId:{
            type:String
        },
        text:{
            type:String
        }
    },
    {
        timestamps:true
    }
  );
const Message = mongoose.model("Message",MessageModel);
module.exports = Message;