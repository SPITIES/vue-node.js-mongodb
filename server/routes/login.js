var express = require('express');
var router = express.Router();
/**
 * bodyparser 用于解析 前端发送的post请求的内容
 */
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var DB = require('./../module/db');

router.post('/login',(req,res)=>{
    console.log(req.body);
    DB.find('user',req.body,(err,data)=>{
      if(err){
        console.log(err)
      }
      if(data.length>0){
        res.json({
            code:200,
            status:'登录成功'
        })
      }else{
        res.json({
          code:500,
          status:'登录失败'
      })
      }
    })   
  })
  
module.exports = router