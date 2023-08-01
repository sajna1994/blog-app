const express = require('express')
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));
const jwt = require("jsonwebtoken");
const blogData=require('../model/blogData')

// Get
router.get('/viewall/:token',async(req,res)=>{
    let data =await postData.find();
    try{
        jwt.verify(req.params.token,"ict",
        (error,decoded)=>{
            if(decoded && decoded.emil){
                res.json(data);

            }else{
                res.json({message:"unauthorised user"})
            }
        }
        )
        // const data=await blogData.find();
        // res.json(data);
    }
    catch(error){
        res.json('Data not found')
        console.log(error);
    }

})
// post
router.post('/addpost',async(req,res)=>{
    try {
       const item=req.body;
       const  newData=new blogData(item);
       jwt.verify(req.body.token,"ict",
       (error,decoded)=>{
        if (decoded && decoded.email) {
            newPost.save();
            res.json({message:"post added successfully"})
            
        } else {
           res.json({message:"unauthorised user"}) 
        }
       }
       )
       const savedData=await newData.save();
       res.json({message:'post successful'});
    } 
    catch (error) {
        res.json({message:'post not successful'});
        console.log(error);
    }
})

//put
router.put('/edit/:id',async(req,res)=>{
    try {
       const item=req.body;
       const  postId=req.params.id;
       console.log(postId);

       const updated=await blogData.findByIdAndUpdate(postId, req.body);
       
       res.json({message:'updation successful'});
    } 
    catch (error) {
        console.log(error.message);
        res.status(400).json('updation not successful');
       
    }
})
//delete
router.delete('/delete/:id',async(req,res)=>{
    try {
       const postId=req.params._id;
       console.log(postId);
       const deletedPost=await blogData.findByIdAndDelete(postId);
       console.log("Deleted");
       res.json({message:'deletion successful'});
    } 
    catch (error) {
        res.status(400).json({message:'deletion not successful'});
        
    }
})


module.exports=router;