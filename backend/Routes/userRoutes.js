const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userModel = require("../Models/userModel");
router.get("/allusers/:user",async(req,res)=>{
    console.log("first")
    const user = req.params.user;
    try {
        const usersFound = await userModel.find({"username" : {$regex : user}});
        res.status(200).send({data:usersFound});
        console.log(usersFound);
    } catch (error) {
        res.status(500).send({data:error.message});
        console.log(error)
    }
})
router.post("/register",async(req,res)=>{
    try {
        const {username,email,password,profile} = req.body;
        const userExist =await userModel.findOne({email});
        if(userExist)
        {
            res.send({
                data:"User Already Exists",
                success:false
            })
            return;
        }
        const hashedPass = await bcrypt.hash(password,10);
        const newUser= await userModel.create({
            username,email,password:hashedPass,profile
        });
        
        res.send({
                success:true,
                token : jwt.sign(newUser._id.toString(),"password")
            })
    } catch (error) {
        //console.log(error)
        res.send({
            success:false,
            data:error.message
        })
    }
    
});

router.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
        console.log("first")
        const userFound = await userModel.findOne({email});
        if(!userFound)
        {
            res.send({
                success:false,
                data: "Invalid Credentials"
            });
            return;
        }
        const userPassword = userFound.password;
        const compare = await bcrypt.compare(password,userPassword);
        if(!compare)
        {
            res.send({
                success:false,
                data: "Invalid Credentials"
            });
            return;
        }
        else{
            res.send({
                success:true,
                data: userFound._id.toString()
            });
        }
    } catch (error){
      res.send({success:false,data:error.message})
    }
});

router.get('/:id',async (req,res)=>
{
    try {
        const userFound = await userModel.findById(req.params.id);
        res.status(200).send({success:true,data:userFound});
    } catch (error) {
        res.status(500).send({success:true,data:error.message});
    }
});

module.exports = router;        