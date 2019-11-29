// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
   
   const db = cloud.database();
   const collection = db.collection("test");

   console.log(collection);

   var result = await collection.get();
    return result;
    
}