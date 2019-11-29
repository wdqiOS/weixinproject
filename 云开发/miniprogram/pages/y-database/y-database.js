// pages/y-database/y-database.js
// 1. 先获取数据库对象
const db = wx.cloud.database();
// 2. 获取操作的集合
const collection = db.collection('students');

// 每次查询条数
const LIMIT = 3;

Page({
    data: {
        page: 0,
    },

    addDataToDB: function (e) {
        console.log(e);
        // 在数据库中添加一条数据
        // 3. 向集合中添加一条数据
        collection.add({
            data: {
                _id: "1",
                name: 'wdq',
                age: 20,
                height: 1.80,
                course:['高等数学','Java编程', '编译原理'],
                goodfriend:{
                    name: 'lz',
                    age: 18,
                },
                location: db.Geo.Point(100, 50),
            },
        })
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    },

    /**
     * 删除某一条数据
     */
    removeDataToDB(e){
        
        // 精准删除
        collection
        .doc("05a1947c5dd7e8d2022cab066c68db88")
        .remove()
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
        // 条件删除
        // collection.where({
        //     age: 20,
        // }).remove({
        //     success: (res) => {
        //         console.log(res);
        //     },
        //     fail: (err) => {
        //         console.log(err);
        //     }
        // })
    },


    /**
     * 更新数据
     */
    updateDataToDB() {
        // update方法：修改/添加某些字段
        collection.doc('05a1947c5dd7eab2022d2b365c86605d')
        .update({
            data: {
                age: 100,
                score: 100
            }
        })
        .then(console.log)
        .catch(console.error)
        // set：直接修改对象
        // collection.where({
        //     name: 'lz'
        // }).set({
        //         data: {
        //             age: 50,
        //             score: 100
        //         }
        //     })
        //     .then(console.log)
        //     .catch(console.error)

    },

    /**
     * 查询数据
     */
    queryDataFromDB() {
       // 1. 根据id精准查找数据
       collection
        .doc("38034ae05dd7eab2022c6b6f5ee777fb")
        .get()
        .then(res => {
           console.log(res);
        });

        // 2. 根据条件查找where
        collection
        .where({age: 20})
        .get()
        .then(res => {
            console.log(res);
        });

        // 3. 使用查询指令查询数据 gt: 大于 lt:小于 gte: 大于等于 lte: 小于等于
        const cmd = db.command;
        collection
            .where({ age: cmd.gt(20)})
            .get()
            .then(res => {
                console.log(res);
            });

        // 4. 根据正则表达式获取数据 ^以什么开头
        collection
            .where({
                name: db.RegExp({
                    regexp:"^wd.*",
                    options: "i", // i 忽略大小写
                }) 
            })
            .get()
            .then(res => {
                console.log(res);
            });
        // 5. 不跟任何的条件，直接查询整个集合 注意数据库权限设置
        collection.get().then(res => {
            console.log(res);
        });

        // 6. 几个字段的作用
        // field:过滤只需要获取的字段
        collection
            .field({
                name: true,
                age: true,
                height: true,
            })
            .get()
            .then(res => {
                console.log(res);
            })
        // 7. skip：跳过多少条数据
        // 8. limit: 本次获取多少条数据
        // 9.  orderBy: 排序字段
        db.collection('wzry')
            .skip(this.data.page * LIMIT).limit(LIMIT)
            .orderBy("rid", "asc")
            .get()
            .then(res => {
                this.data.page += 1;
                console.log(res);
                console.log(2222222);
            });

        
    },

    /**
     * 开始监听
     */
    startListen() {
        db.collection("chartroom")
        .where({
            groupid: "110"
        })
        .watch({
            onChange: function (snap) {
                console.log(snap);
            },
            onError: function (err) {
                console.log(err);
            }
        })
    },
    /**
     * 发送消息
     */
    sendMessage() {
        db.collection("chartroom").add({
            data: {
                groupid: "110",
                message: "李哲李哲"
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