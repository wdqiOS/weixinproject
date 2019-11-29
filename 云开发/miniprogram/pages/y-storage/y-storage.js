// pages/y-storage/y-storage.js
Page({
    data: {
        imageFileID: null,
        videoFileID: null,
        localFilePath: "http://tmp/wx3d6de7f7125f92dc.o6zAJs19MrsISPKI-5bVcVaY76Cc.zkoOotZfBcto6ad388ae1a9610bbece2b0d13c6b3a3d.mp4",
    },
    // 上传文件
    uploadFile() {
        // 1、用户选择一张照片，从相册/拍照
        wx.chooseImage({
            success:(res)=>{
                console.log(res);
                // 2、获取选中的图片路径
                const filePath = res.tempFilePaths[0];

                // 3. 上传图片到云存储中
                // const fileName = "时间戳_openid_随机数";
                const timestamp = new Date().getTime();
                const openid = '3245fdlajsfldas';
                const cloudPath = `images/${ timestamp }_${ openid }.png`;
                wx.cloud.uploadFile({
                    // filePath: filePath,
                    filePath, // 上传的图片路径 ES6简写
                    cloudPath // 上传到cloud的什么位置
                })
                .then(res => {
                    console.log(res.fileID);
                    this.setData({
                        imageFileID: res.fileID,
                    })
                })
                .catch(err => {

                })
            },
            fail:(err) => {
                console.log(err);
            }
        })
    },

    /**
     * 上传视频
     */
    uploadVideo() {
        wx.chooseVideo({
            success: res => {
                console.log(res);
                const filePath = res.tempFilePath;
                wx.cloud.uploadFile({
                    filePath,
                    cloudPath: "lz.mp4"
                })
                .then(res => {
                    this.setData({
                        videoFileID: res.fileID
                    })
                })
                .catch(err => {

                })
            }
        })
    },

    /**
     * 获取文件的临时链接
     */
    getTempURL() {
        const fileid = "cloud://yun-dev-xsnfv.7975-yun-dev-xsnfv-1258596560/images/1574858263868_3245fdlajsfldas.png";
        wx.cloud.getTempFileURL({
            fileList: [fileid],
        }).then(res => {
            console.log(res);
        })
    },

    /**
     * 
     */
    downloadVideoFile() {
        wx.cloud.downloadFile({
            fileID: "cloud://yun-dev-xsnfv.7975-yun-dev-xsnfv-1258596560/lz.mp4",
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {

        })
    },

    /**
     * 删除云存储文件
     */
    deleteFile() {
        const fileid = "cloud://yun-dev-xsnfv.7975-yun-dev-xsnfv-1258596560/lz.mp4";
        wx.cloud.deleteFile({
            fileList: [fileid]
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {

        })
    }
})