var express = require('express');
var router = express.Router();

var fs = require('fs');

var DB = require('./../module/db');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
/**
 * multiparty ,表单涉及到图片的上传
 */
var multiparty = require('multiparty');
router.get('/',(req,res)=>{
    DB.find('product',{},(err,data)=>{
        if(err){
            console.log(err)
        }
        res.json({
            code:200,
            status:"请求成功",
            pagesize:10,
            size:data.length,
            results:data
        })
    })

})
/**
 * 上传图片
 */
router.post('/fileUpload',(req,res)=>{
    var form = new multiparty.Form();
    form.uploadDir = 'upload';
    form.parse(req,(err,fields,files)=>{
        if(err){
            console.log(err)
        }
        // console.log(fields);
        console.log(files);
        console.log(files.file[0].path)
        res.json({
            code:200,
            status:'上传图片成功!',
            imgurl:files.file[0].path
        })
    })
    
})
/**
 * 删除图片
 */
router.post('/deleteImg',(req,res)=>{
    console.log(req.body)
    var id = req.body._id;
    var imgurl = req.body.img;    
    //1.更新数据库
    DB.update("product",{'_id':new DB.ObjectID(id)},{
        pic:''
    },(err,data)=>{
        if(err){
            console.log(err)
        }
        //2.删除本地upload的图片
        fs.unlink(imgurl,(err)=>{
            if(err){
                console.log(err);
            }
        });
        res.json({
            code:200,
            status:'删除图片成功！',
            results:{
                pic:''
            }
        })
    })
})
/**
 * 添加商品
 */
router.post('/addproduct',(req,res)=>{
    console.log(req.body);
    DB.insert('product',req.body,(err,data)=>{
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
 * 修改商品
 */
router.post('/editproduct',(req,res)=>{
    console.log(req.body)
    var id = req.body._id;
    DB.update('product',{ "_id":new DB.ObjectID(id)},{
        title: req.body.title,
        pic: req.body.pic,
        price: req.body.price,
        fee: req.body.fee,
        description: req.body.description
    },(err,data)=>{
        if(err){
            console.log(err)
        }
        res.json({
            code:200,
            status:'修改成功！'
        })
    })
})
/**
 * 删除商品
 */
router.post('/deleteproduct',(req,res)=>{
    var id = req.body._id;
    DB.deleteOne('product',{ "_id": new DB.ObjectID(id)},(err,data)=>{
        if(err){
            console.log(err)
        }
        res.json({
            code:200,
            status:'删除成功！'
        })
    })
})

module.exports = router;