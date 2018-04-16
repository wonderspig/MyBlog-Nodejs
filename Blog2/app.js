var express=require('express');
//加载模板处理模块
var swig=require('swig');
var bodyParser = require('body-parser')
//加载数据库模块
var mongoose=require('mongoose');
var app=express();

//表示当用户访问的url已/public开始，那么直接返回对应__dirname+/public/下的文件
app.use( '/public', express.static( __dirname + '/public') );
//第一个参数是模板引擎的名称
//第二个参数是用于解析处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放目录
app.set('views','./views');
//注册使用的模板引擎
app.set('view engine','html');
//在开发过程中，需要取消缓存的限制,否则每次都要重启服务
swig.setDefaults({caches:false});

//bodyparser设置,中间件，他会自动在request添加一个body属性，里面有post提交的数据
app.use(bodyParser.urlencoded({extended:true}));

//根据不同功能划分不同模块。
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


//监听http请求
mongoose.connect('mongodb://localhost:27017/blog',function (err) {
    if (err)
    {
        console.log('数据库连接失败');
    }else
    {
        console.log('数据库连接成功');
        //端口监听
        app.listen(9090);
    }
});


//路由绑定,app.get/app.post等方法可以把一个url和一个或者N函数进行绑定

// //首页
// app.get('/',function (req,res,next) {
//     //第一个表示模板文件，相对于view目录
//     res.render('index')；这个和模板相对应的
//    // res.send('<h1>欢迎来到我的博客</h1>')
// })
//这个就不需要了
// app.get('/miain.css',function (req,res,next) {
//     //需要告诉浏览器我们发送的是css，而不是一个html文件
//     res.setHeader('content-type','text/css');
//     res.send('body {background:red}');
// });
