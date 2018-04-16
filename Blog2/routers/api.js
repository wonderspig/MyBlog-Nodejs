//这个其实就是一个子路由
var express=require('express');
var router=express.Router();
var User=require('../models/User');
//统一返回格式
var responseData;
router.use(function (req,res,next) {
   responseData={
       code:0,
       message:' '
   }
   next();
});
/**
 * 用户注册：
 * 1.用户名和密码不能为空
 * 2。两次输入密码要一致
 * 3.数据库中该用户名不存在
 */
router.post('/user/register',function (req,res,next) {
    var username=req.body.username;
    var password=req.body.password;
    var repassword=req.body.repassword;
    if (username=='')
    {
        responseData.code=1;
        responseData.message='用户名不能为空！';
        res.json(responseData);
        return;
    }
    if (password=='')
    {
        responseData.code=2;
        responseData.message='密码不能为空！';
        res.json(responseData);
        return;
    }
    if (password!=repassword)
    {
        responseData.code=3;
        responseData.message='两次输入密码不一致！';
        res.json(responseData);
        return;
    }

    User.findOne({username:username}).then(function (userInfo) {
        if (userInfo)
        {
            responseData.code=4;
            responseData.message='用户名已经被注册！';
            res.json(responseData);
            return;
        }
        else
        {
            //否则进行保存到数据库
            var user=new User({username:username,
        password:password});
            return user.save();

        }
    }).then(function (value) {
        responseData.message='注册成功！';
        res.json(responseData);
        return ;
    });

    return;
});



router.post('/user/login',function (req,res,next) {
    var username=req.body.username;
    var password=req.body.password;
    var repassword=req.body.repassword;
    if (username=='' || password=='')
    {
        responseData.code=1;
        responseData.message='用户名或者密码吗不能为空！';
        res.json(responseData);
        return;
    }


    User.findOne({username:username,password:password}).then(function (userInfo) {
        if (userInfo=='')
        {
            responseData.code=2;
            responseData.message='用户名或密码错误！';
            res.json(responseData);
            return;
        }
        else
        {
            responseData.message='登录成功！';
            res.json(responseData);
            return ;

        }
    });



});
//需要将路由器进行返回
module.exports=router;