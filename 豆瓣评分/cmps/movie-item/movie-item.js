// cmps/movie-item/movie-item.js
let app =  getApp();
  
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        movie: {
            type: Object,
            value: null,
        },
        // name: {
        //     type: String,
        //     value: '',
        // },
        // fontSize: { // 驼峰在传值时会转成 font-size
        //     type: Number,
        //     value: 0,
        // },
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        detail(e){
            console.log(e);
            console.log(this.data.movie);
            console.log(this.properties.movie);
            // 数据传递方法一：(IO操作)
            // wx.setStorageSync('movie', this.data.movie);
            // 数据传递方法二：(利用全局传值，可能数据污染)
            wx.db.movie = this.data.movie;
            // 数据传递方法三：序列化：将JSON对象转换为JSONString 反序列化：将JSONString转换为JSON对象
            // JSON.stringify(this.data.movie); // 序列化
            // const movie = JSON.parse(options.movie); // 反序列化
              
            wx.navigateTo({
                url: `/pages/detail/detail?movie=${ JSON.stringify(this.data.movie) }`,
            });
              
        },
    }
})
