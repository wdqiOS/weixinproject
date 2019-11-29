// pages/profile/profile.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items:[
            {
                icon: '/assets/imgs/ic_cat_movie.png',
                title: '观影分析',
                count: 0,
                has: '看过',
                mark: '标记10部影片\n开启观影分析'
            },
            {
                icon: '/assets/imgs/ic_cat_book.png',
                title: '读书分析',
                count: 10000,
                has: '看过',
                mark: '标记10部影片\n开启观影分析'
            },
            {
                icon: '/assets/imgs/ic_cat_music.png',
                title: '音乐分析',
                count: 0,
                has: '看过',
                mark: '标记10部影片\n开启观影分析'
            },
        ],
    },
    begin(evt) {
        console.log(evt);
        // evt.currentTarget.id
        const idex = evt.currentTarget.dataset.index;
        if(0 == idex) {
            console.log('观影分析');
        } else if(1 == idex) {
            console.log('读书分析');
        } else if(2 == idex) {
            console.log('音乐分析');
        }
    },
    /**
     * 登录
     */
    login(){
        wx.navigateTo({
            url: '/pages/login/login',
        });
    },
})