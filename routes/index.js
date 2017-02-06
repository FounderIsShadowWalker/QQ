var express = require('express');
var router = express.Router();
var mongoness=require('mongoose');
var User=require('../model/User.js');
var Login=require('../model/Test.js');
mongoness.connect("mongodb://localhost/founder");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login',function(req,res){
    var query_login={name:req.body['userId'],password:req.body['talk_password']};
    console.log(req.body['userId']);
    console.log(req.body['talk_password']);
    User.count(query_login,function(err,doc){
        if(doc==0)
         res.render('login');
        if(doc==1) {
            User.find({name:req.body['userId'],password:req.body['talk_password']},function(err,result){
                res.render('talk',{title:result});

        })
    }
    })
});
router.post('/messagePost',function(req,res){
    console.log('Post');
    console.log("即将写入数据库的内容");
    console.log(req.body['message']);
    console.log("我的qq"+req.body['my_qq']);
    console.log(req.body['talk_qq_number']);
    //var m=User.aggregate(
    //    {$unwind:"$contact_list.default"},
    //    {$unwind:"$contact_list.default.default_list"},
    //    {$match:{
    //        "contact_list.default.default_list.qq_number":"1528021521"
    //    }
    //    },
    //    {
    //        $project:{
    //            content:"$contact_list.default.default_list.talk.content",
    //            _id:0
    //        }
    //    }
    //);
    //var data=JSON.parse(req.body['message']);
    //console.log(JSON.stringify(data[0]));
    //var a="{'data':"+JSON.stringify(data)+"}";
    //var new_message=JSON.stringify(data[0]);    //去除字符串中所有id
    //var re=/"_id"+.{27}/g;
    //var result=new_message.replace(re,"");
    //console.log("第一次:"+result);
    //result=result.replace(/{+,/g,"{");
    //result=result.replace(/,+,/g,",");
    //result=result.replace(/,+}/g,"}");
    //console.log("最后一次:"+result);
    //var user = new User(JSON.parse(result));
    //user.save();
    //res.send(a);
})
router.post('/messageWrite',function(req,res){
    console.log('Write');
    console.log("即将写入数据库的内容");
    console.log(req.body['message']);
    console.log("我的qq"+req.body['my_qq']);
    console.log(req.body['talk_qq_number']);
    //User.remove({name:req.body['my_qq']});
    //var data=JSON.parse(req.body['message']);
    //var new_message=JSON.stringify(data[0]);
    //new_message="{"+new_message.substr(new_message.indexOf(",")+1,new_message.length);
    //console.log(new_message);
    //var user = new User(JSON.parse(new_message));
    //user.save();
})

module.exports = router;
