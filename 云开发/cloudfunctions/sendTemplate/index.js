// 云函数入口文件
const cloud = require('wx-server-sdk')
// ES6对象的解构
const { WXMINIUser, WXMINIMessage } = require("wx-js-utils");

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    // 1. 获取access_token
    const user = new WXMINIUser({
        appId: "wx3d6de7f7125f92dc",
        secret: "bdb287d4f2f024a76e7ae4e7550b1a44",
    })
    const access_token = await user.getAccessToken();

    // 2. 获取参数，发送消息模板
    const template_id = "neJv1M-EDnikQp5imYWwUELhi_DxH9HO8BIZv1HWDPw";
    const touser = cloud.getWXContext().OPENID;
    const form_id = event.formId;

    // 3. 发送模板消息
    let wXMINIMessage = new WXMINIMessage();
    let result = await wXMINIMessage.sendMessage({
        access_token,
        touser,
        form_id,
        template_id,
        data: {
            keyword1: {
                value: 'TIT时尚公寓' // keyword1 的值
            },
            keyword2: {
                value: '2016年8月8日' // keyword2 的值
            },
            keyword3: {
                value: '800元' // keyword3 的值
            },
            keyword4: {
                value: '兴港路88888号' // keyword4 的值
            },
            keyword5: {
                value: '88号' // keyword5 的值
            },
            keyword6: {
                value: 'DB1234587655' // keyword6 的值
            },
        },
        page: 'pages/index/index' // 点击模板消息后，跳转的页面
    });

    return result;
}