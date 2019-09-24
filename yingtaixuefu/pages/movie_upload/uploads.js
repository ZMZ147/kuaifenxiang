// pages/upload/uploads.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typelist: ["类别", "电影", "电视剧"],
    countrylist: ['地区', "中国", "日本", "韩国", "美国", "印度", "泰国", "其他"],
    taglist: ["标签", "喜剧", "科幻", "悬疑", "剧情", "武侠", "玄幻", "爱情", "家庭", "传记", "记录", "动作", "恐怖"],
    timelist: ["时间", "2019", "2018", "2017", "2016", "2015", "2015以前"],
    typeindex: 0,
    tagindex: 0,
    countryindex: 0,  
    timeindex:0,
    coverimg: "",
    uploaddata:{
      "type":"",
      "country":"",
      "tag":"",
      "time":"",
      "reason":"",
      "synopsis":"",
      "name": "",
      "coverimg":"",
      "owner":"",
    },
    is_image:false,
    height:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let user = app.globalData.id
      let uploaddata = this.data.uploaddata
      uploaddata['owner'] = user

      let height = wx.getSystemInfoSync().screenHeight-20
      this.setData({
        uploaddata: uploaddata,
        height:height
      }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      // let uploaddata = this.data.uploaddata
      // uploaddata["name"] = e.data.value
      // this.setData({
      //   uploaddata:uploaddata
      // })
  },

  vediotitle:function(e){
      let uploaddata = this.data.uploaddata
      uploaddata["name"] = e.detail.value
      this.setData({
        uploaddata:uploaddata
      })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let imgpath = res.tempFilePaths
        // let uploaddata = that.data.uploaddata
        // uploaddata['coverimg'] = imgpath[0]
        that.setData({
          files: imgpath[0],
          is_image:true,
          // uploaddata:uploaddata,
          coverimg:imgpath[0]
        });
        console.log(that.data.files)
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  bindtypeChange: function (e) {
    let uploaddata = this.data.uploaddata
    let typelist = this.data.typelist
    uploaddata['type'] = typelist[e.detail.value]
    this.setData({
      typeindex: e.detail.value,
      uploaddata: uploaddata
    })
  },
  bindcountryChange: function (e) {
    let uploaddata = this.data.uploaddata
    let countrylist = this.data.countrylist
    uploaddata["country"] = countrylist[e.detail.value]
    this.setData({
     countryindex: e.detail.value,
      uploaddata: uploaddata
    })
  },
  bindTagChange: function (e) {
    let uploaddata = this.data.uploaddata
    let taglist = this.data.taglist
    uploaddata["tag"] = taglist[e.detail.value]
    this.setData({
      tagindex: e.detail.value,
      uploaddata: uploaddata
    })
  },
  bindtimeChange: function (e) {
    let uploaddata = this.data.uploaddata
    let timelist = this.data.timelist
    uploaddata["time"] = timelist[e.detail.value]
    this.setData({
      timeindex: e.detail.value,
      uploaddata:uploaddata
    })
  },
  introduce:function(e){
    let uploaddata = this.data.uploaddata
    uploaddata["synopsis"] = e.detail.value
    console.log(uploaddata)
    this.setData({
      uploaddata: uploaddata
    })
  },
  reason:function(e){
    let uploaddata = this.data.uploaddata
    uploaddata["reason"] = e.detail.value
    this.setData({
      uploaddata: uploaddata
    })
  },
  openConfirm: function () {
    let that = this 
    wx.showModal({
      title: '参数有误出错',
      content: '麻烦请重新输出参数，感谢分享',
      confirmText: "确认呢",
      // cancelText: "辅助操作",
      success: function (res) {
        console.log(res)
        if (res.confirm == true) {
          that.onLoad();
        } else {
          console.log("知道了")
        }
      }
    });
  },
  submit:function(){
    // 写完之后应该回到电影页面
    let httpurl = app.globalData.url
    let file = this.data.coverimg
    let data = this.data.uploaddata
    let that = this 
    wx.uploadFile({
      url: httpurl+"/movies/",
      filePath: file,
      name: 'coverimg',
      formData:data,
      header:{"Content-Type":"form-data"},
      success(res){
        if(res.statusCode==200){
          wx.removeStorageSync("movies")
          wx.redirectTo({
            url: '../movie/movies',
          })
        }else{
          that.openConfirm();
        }
      }
    })

  }
})