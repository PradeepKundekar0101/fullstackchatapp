const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("../backend/connect");
const userRoute = require("../backend/Routes/userRoutes");
const chatRoute  = require("../backend/Routes/chatRoutes");
const conversationRoute = require("../backend/Routes/conversationRoutes");
const messageRoute = require("../backend/Routes/messageRoutes");

const app= express();
dotenv.config();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
connect();
app.get("/",(req,res)=>{
    res.send({
        message:"Hello"
    })
})
app.use('/api/user',userRoute);
app.use("/api/chat",chatRoute);
app.use('/api/conversation',conversationRoute);
app.use("/api/message",messageRoute);
app.listen(PORT,()=>{
    console.log("Server Running at port "+PORT);
}); 