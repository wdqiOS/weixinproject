// pages/login/login.js
Page({

    /**
     * 微信登录
     */
    wechatLogin: function () {
        console.log('wechatLogin');
    },
     /**
      * 豆瓣登录
      */
     doubanLogin: function () {
        console.log('doubanLogin');
     },
     /**
      * 豆瓣使用协议 ES6语法
      */
     openAgreement() {
        console.log('openAgreement');
        wx.navigateTo({
            url: '/pages/agreement/agreement',
        });
          
     }
})