//app.js
App({
  onLaunch: function () {

    wx.db = {};

    wx.db.url = (url) => {
      return `https://douban-api.uieee.com/${url}`;
    };

    this.initToast();

    var info = wx.getSystemInfoSync();
    wx.db.statusBarHeight = info.statusBarHeight;
    if (info.platform == 'android') {
      wx.db.navBarHeight = 48;
    } else {
      wx.db.navBarHeight = 44;
    }



  },

  initToast: function () {
    const time = 1500;
    // type = 0 正常
    // type = 1 成功信息
    // type = 2 错误信息
    const ToastTypeNormal = 0;
    const ToastTypeSuccess = 1;
    const ToastTypeError = 2;
    let commpnToast = (title, type, duration = 1500) => {
      let options = {
        title: title,
        icon: 'none',
        duration: duration
      };
      if (type == ToastTypeSuccess) {
        options.icon = 'success';
      } else if (type == ToastTypeError) {
        options.image = '/assets/imgs/ic_search.png';
      }
      wx.showToast(options)
    }
    wx.db.toast = (title, duration = time) => {
      commpnToast(title, 0, duration)
    };
    wx.db.toastSuccess = (title, duration = time) => {
      commpnToast(title, 1, duration)
    };
    wx.db.toastError = (title, duration = time) => {
      commpnToast(title, 2, duration)
    };
  },

  globalData: {
    userInfo: null
  }
})