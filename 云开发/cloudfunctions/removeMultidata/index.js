// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: "yun-dev-xsnfv",
    traceUser: true
})

// 云函数入口函数
exports.main = async (event, context) => {
    // 1. 获取数据库对象
    const db = cloud.database();

    // 2. 操作的集合
    const collection = db.collection("teacher");

    // 3. 根据条件删除指定数据
    const cmd = db.command;

    // 直接返回Promise就可以
    return collection.where({
        age: cmd.gte(30)
    }).remove();


    const result = await collection.get();
    return result;
}