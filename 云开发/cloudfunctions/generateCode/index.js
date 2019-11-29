// 云函数入口文件
const cloud = require('wx-server-sdk');
/*
const utils = require("wx-js-utils");
const WXMINUser = utils.WXMINUser;
const WXMINIQR = utils.WXMINIQR;
*/
// ES6对象的解构
const { WXMINIUser, WXMINIQR} = require("wx-js-utils");

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    // 1、获取access_token
    const user = new WXMINIUser({
        appId: "wx3d6de7f7125f92dc",
        secret: "bdb287d4f2f024a76e7ae4e7550b1a44",
    })
    const access_token = await user.getAccessToken();
    console.log(access_token);
    // 2. 获取小程序码
    const qr = new WXMINIQR();
    const qrCode = await qr.getMiniQRLimit({
        access_token: access_token,
        path: "pages/index/index"
    });
    // 3. 将小程序码上传到云存储中
    return cloud.uploadFile({
        cloudPath: "images/minicode.png",
        fileContent: qrCode,
    })
}