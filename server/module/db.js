var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://127.0.0.1:27017/';
var dbname = 'product';

var ObjectID = require("mongodb").ObjectID;
exports.ObjectID = ObjectID;

function connectDB(callback){
    MongoClient.connect(dburl,(err,client)=>{
        if(err){
            console.log(err);
            return;
        }else{
            var db = client.db(dbname);
            callback(db);
            client.close();
        }
    })
}

exports.find = (collectionname,json,callback)=>{
    connectDB( db => {
        var result = db.collection(collectionname).find(json);
        /** 遍历数组的一种方式 */
        result.toArray( (err,data) =>{
            callback(err,data);
        })
    })
}

exports.insert = (collectionname,json,callback)=>{
    connectDB( db =>{
        db.collection(collectionname).insertOne(json,(err,data)=>{
            callback(err,data);
        })
    })
}

exports.update = (collectionname,json1,json2,callback)=>{
    connectDB( db =>{
        db.collection(collectionname).updateOne(json1,{$set:json2},(err,data)=>{
            callback(err,data);
        })
    })
}

exports.deleteOne = (collectionname,json,callback)=>{
    connectDB( db=>{
        db.collection(collectionname).deleteOne(json,(err,data)=>{
            callback(err,data);
        })
    })
}