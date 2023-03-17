const express = require("express");
const router = express.Router();
const conversation = require("../Models/conversationModel");
router.post('/',async(req,res)=>{
    try {
        const newConversation = new conversation({
            members:[req.body.senderId,req.body.receiverId]
        }
        );
        const response = await newConversation.save();
        res.status(200).send({success:true,data:response});
    } catch (error) {
        res.status(500).send({success:false,data:error.message});
    }
});
//Get Conversation By Id 

router.get("/:userId",async(req,res)=>{
    try
    {
        const conservationFound = await conversation.find({
            members: { $in:[req.params.userId]}
        });
        res.status(200).send({success:true,data:conservationFound});
    }catch (error) {
        res.status(500).send({success:false,data:error.message})
    }
})

module.exports = router;