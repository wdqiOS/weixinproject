// pages/home/home.js
// https://douban.uieee.com
// https://douban-api.uieee.com
const ak = 'sPIlXgCHhGostoOpqy7v8KM5jdBuyemT'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies:[],
        allMovies:[
            {
                title: '影院热映',
                url: 'v2/movie/in_theaters',
                movies:[],
            },
            {
                title: '新片榜',
                url: 'v2/movie/new_movies',
                movies:[],
            },
            {
                title: '口碑榜',
                url: 'v2/movie/weekly',
                movies:[],
            },
            {
                title: '北美票房榜',
                url: 'v2/movie/us_box',
                movies:[],
            },
            {
                title: 'Top250',
                url: 'v2/movie/top250',
                movies:[],
            },
        ],
    },

    onPullDownRefresh() {
        console.log('32432');
        setTimeout(()=>{
            console.log(1111);
            wx.stopPullDownRefresh();
        }, 2000);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        // 方式一：利用系统设置导航条
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#42bd55',
        });
          

        this.data.topHeight = wx.db.statusBarHeight + wx.db.navBarHeight;


        // 获取经纬度
        // this.loadCity((city) => {
        //     this.loadData(city);
        // });
        // 加载本地数据
        this.loadLocalData();
        // 进行网络请求
        this.loadCity((city)=> {
            this.loadNewData(0, { city: city });
        });
        this.loadNewData(1);
        this.loadNewData(2);
        this.loadNewData(3);
        this.loadNewData(4);

        // this.data.allMovies.forEach((element, index) => {
        //     0 == index ? this.loadCity((city)=> {
        //         this.loadNewData(0, { city: city });
        //     }) : this.loadNewData(index);
        // });
    },

    loadNewData: function (idx, params) {
        // const obj = this.data.allMovies[idx];
        wx.request({
            url: wx.db.url(this.data.allMovies[idx].url),
            data: params,
            header: {'content-type':'json'},
            success: (res) => {
                // console.log(obj.title,res.data.subjects);
                const obj = this.data.allMovies[idx];
                obj.movies = [];
                const movies = res.data.subjects;
                for (let index = 0; index < movies.length; index++) {
                    let movie = movies[index].subject || movies[index];
                    this.updateMoviesStar(movie);
                    obj.movies.push(movie);
                }

                this.setData(this.data);

                // 异步缓存数据
                wx.setStorage({
                    key: obj.title,
                    data: obj.movies,
                });
                  

            },
            fail: () => {
                wx.db.toast(`获取${ obj.title }失败`);
            },
            complete: () => {}
        });
    },

    // 加载本地数据
    loadLocalData(){
        for (let index = 0; index < this.data.allMovies.length; index++) {
            let obj = this.data.allMovies[index];
            obj.movies = wx.getStorageSync(obj.title) || [];              
        }
        this.setData(this.data);
    },

    // 获取城市
    loadCity: function (success) {
        // 获取经纬度
        wx.getLocation({
            type: 'wgs84',
            altitude: false,
            success: (result) => {
                console.log(result.latitude, result.longitude);
                wx.request({
                    url: 'https://api.map.baidu.com/reverse_geocoding/v3/',
                    data: {
                        ak: ak,
                        output: 'json',
                        coordtype: 'wgs84ll',
                        // location:result.latitude + ',' + result.longitude // 字符串拼接
                        location:`${result.latitude},${result.longitude}` // ES6字符串拼接
                    },
                    header: {'content-type':'application/json'},
                    method: 'GET',
                    success: (res) => {
                        console.log(res.data.result.addressComponent.city);
                        let city = res.data.result.addressComponent.city;
                        city = city.substring(0, city.length - 1);
                        // if(success) success(city);
                        success && success(city);
                    },
                    fail: () => {
                        console.log('获取城市失败');
                        wx.db.toastError('获取城市失败');
                    },
                    complete: () => {}
                });
                  
                
            },
            fail: () => {
                console.log('获取位置失败');
                wx.db.toastError('获取位置失败');
            },
            complete: () => {}
        });
    },

    /**
     * 处理电影评价
     */
    updateMoviesStar: function(movie){
        let stars = parseInt(movie.rating.stars);
        if(stars == 0) return;
        movie.stars = {};
        movie.stars.on = parseInt(stars / 10);
        movie.stars.half = (stars - (movie.stars.on * 10)) > 0;
        movie.stars.off = parseInt((50 - stars) / 10);
    },

    /**
     * 查看更多
     */
    viewMore(e){
        console.log(e);
        const idx = e.currentTarget.dataset.index;
        const obj = this.data.allMovies[idx];
        wx.navigateTo({
            url: `/pages/list/list?title=${ obj.title }&url=${ obj.url }`,
        });
          
    },
})