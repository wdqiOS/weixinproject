// cmps/nav-bar/nav-bar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: ''
        },
        titleSize: {
            type: Number,
            value: 32,
        },
        titleColor: {
            type: String,
            value: '#000',
        },
        statusBarColor: {
            type: String,
            value: '#fff'
        },
        navBarColor: {
            type: String,
            value: '#fff'
        },
        back: {
            type: String,
            value: 'true',
        },
        home: {
            type: String,
            value: 'true'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        statusBarStyle: '', // 状态栏样式
        navBarStyle: '', // 导航栏样式
    },

    /**
     * 组件的方法列表
     */
    methods: {
        back(){
            wx.navigateBack();
            this.triggerEvent('back', {name: 'lz'});
        },
        home(){
           wx.navigateBack({
               delta: 9999
           });
           this.triggerEvent('home', {event: 'home'});
        },
    },
    lifetimes: {
        attached(){
            

              
            const statusBarStyle = `
            height:${ wx.db.statusBarHeight }px;
            background-color:${ this.data.statusBarColor };
            `;
            const navBarStyle = `
            height:${ wx.db.navBarHeight }px;
            background-color:${ this.data.navBarColor };
            color:${ this.data.titleColor };
            `;
            this.setData({
                statusBarStyle,
                navBarStyle
            })
            // this.setData({
            //     statusBarStyle: statusBarStyle,
            //     navBarStyle: navBarStyle,
            // })
        },
    }
})
