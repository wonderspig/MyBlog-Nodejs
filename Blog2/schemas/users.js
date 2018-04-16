var mongoose=require('mongoose');
//需要将其导出
module.exports=new mongoose.Schema({
    //用户名
    username:String,
    password:String
});