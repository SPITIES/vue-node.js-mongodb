var express = require('express');
var router = express.Router();
var DB = require('./../module/db.js');

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET users listing. */
router.get('/', (req,res)=>{
  DB.find('user',{},(err,data)=>{
    // console.log(data)
    if(err){
      console.log(err)
    }
    res.json({
      code:200,
      status:'连接成功',
      size:data.length,
      results:data
    })
  })
 
});
/**
 * 修改用户信息
 */
router.post('/edituser',(req,res)=>{
  // console.log(req.body);
  var id = req.body._id;
  DB.update('user',{'_id':new DB.ObjectID(id)},{
    name:req.body.name,
    password:req.body.password
  },(err,data)=>{
    if(err){
      console.log(err)
    }
    DB.find('user',{},(err,data)=>{
      // console.log(data)
      if(err){
        console.log(err)
      }
      res.json({
        code:200,
        status:'修改成功',
        size:data.length,
        results:data
      })
    })
  })
  
})
/**
 * 添加用户信息
 */
router.post('/adduser',(req,res)=>{
  // console.log(req.body)
  DB.insert('user',req.body,(err,data)=>{
    if(err){
      console.log(err)
    }
    res.json({
      code:200,
      status:'添加成功！'
    })
  })
})
/**
 * 删除用户信息
 */
router.post('/deleteuser',(req,res)=>{
  // console.log(req.body)
  var id = req.body._id;
  DB.deleteOne('user',{'_id':new DB.ObjectID(id)},(err,data)=>{
    if(err){
      console.log(err)
    }
    res.json({
      code:200,
      status:'删除成功!'
    })
  })
})

module.exports = router;
