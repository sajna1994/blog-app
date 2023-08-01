const mongoose=require('mongoose');
const blogSchema=mongoose.Schema({
    userId: String,
    title:String,
    description:String,
    urlToImage:String,
    publishedAt:{
        type:Date,
        default:new Date()
    }
});
const blogData=mongoose.model('blog',blogSchema);
module.exports=blogData;