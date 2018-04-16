//这个其实就是一个子路由
var express=require('express');
var router=express.Router();

router.get('/',function (req,res,next) {
    res.render('main/index');
});
//需要将路由器进行返回
module.exports=router;