const express =require("express");
const router = express.Router();
const message = require("../Models/messageModel");

//add Message
router.post('/',async(req,res)=>{
    try {
        const newMessage= new message(req.body);
        const savedMessage = await newMessage.save();
        res.status(200).send({
            success:true,
            data:savedMessage
        })
    } catch (error) {
        res.status(500).send({success:true,data:error.message});
    }
});
//Get message on conversation
router.get('/:conversationId',async(req,res)=>{
    try {
        const messages =await message.find({
            conversationId:req.params.conversationId
        })
        res.status(200).send({
            success:true,
            data:messages
        })
    } catch (error) {
        res.status(500).send({success:true,data:error.message});
    }
});

module.exports = router;