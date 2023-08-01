const express = require('express');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));
const jwt = require("jsonwebtoken");

const userData=require('../model/posts');

// Get
router.post('/login',async(req,res)=>{
    let username =req.body.username;
    let password=req.body.password;
    const user= await userData.findOne({username:username});
    if (!user) {
        res.json({message:"user not found"})
        
    }
    try {
        if(user.password==password){
            jwt.sign({email:username,id:user._id},"ict",{expiresIn:'1d'},
            
            (error,token)=>{
                if (error) {
                    res.json({message:"token not generated"})
                } else {
                    res.json({message:"Login Successfully",token:token,data:user})
                }  
                }
                
                )}



       
        else{
            res.json({message:"login failed"}) 
        }
    } catch (error) {
      console.log(error);
    }
});
    
// for signup
router.post('/',async(req,res)=>{
    try {
        console.log(req.body);
       const item=req.body;
       const  newUser=userData(item);
       await newUser.save();
       res.json({message:'Register successfully'});
    } 
    catch (error) {
        res.json('Register not successful');
        console.log(error);
    }
});
module.exports=router;