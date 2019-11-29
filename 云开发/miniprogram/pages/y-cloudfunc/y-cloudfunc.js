// pages/y-cloudfunc/y-cloudfunc.js
Page({
    data: {
        openID: null,
    },
    /**
     * 云函数基本使用
     */
    basicUsing() {
        const num1 = 200;
        const num2 = 100;

        // 如何调用云函数
        wx.cloud.callFunction({
            name: "sum", // 调用哪一个函数
            data: { // 要给云函数传递的参数
                // num1: num1,
                // num2: num2
                num1, // ES6增强语法
                num2
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    },

    getOpenID() {
        wx.cloud.callFunction({
            name: "login"
        })
        .then(res => {
            console.log(res);
            this.setData({
                openID: res.result.openid
            })
        })
        .catch(err => {
            console.log(err);
        })
    },

    /**
     * 
     */
    removeMultidata() {
        wx.cloud.callFunction({
            name: "removeMultidata",
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
        })

        wx.cloud.callFunction({
            name: "search"
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    },

    /**
     * 生成小程序码
     */
    generateCode() {
        wx.cloud.callFunction({
            name: "generateCode",
        })
        .then(res => {
            console.log(res);
            this.setData({
                fileID: res.result.fileID
            })
        })
    },

    /**
     * 提交表单
     * formid必须是真机上才是有效的
     */
    formSubmit(e){
        console.log(e);
        // 1. 取出formId
        const formid = e.detail.formId;
        // 2.
        wx.cloud.callFunction({
            name: "sendTemplate",
            data: {
                formId: formid
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
})