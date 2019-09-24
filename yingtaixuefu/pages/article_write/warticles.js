// pages/warticle/warticles.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typelist:["分类","诗词","随笔"],
    typeindex:0,
    currentword:0,
    height:"",
    datas:{"title":"",
          "content":"",
          "author":"",
          "categary":"",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let height = wx.getSystemInfoSync().windowHeight-50
    this.setData({
      height:height
    })
    console.log(height)


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

  },



  // 拿到分类
  bindtypeChange: function (e) {
    let typelist = this.data.typelist
    let datas = this.data.datas
    datas["categary"] = typelist[e.detail.value]
    this.setData({
      typeindex: e.detail.value,
      datas:datas

    })
  },
  // 拿到内容
  articlecontent: function (e) {
    var value = e.detail.value;
    let datas = this.data.datas
    datas["content"] = value
    var len = parseInt(value.length);
    let that = this
    let max = 500
    console.log(value)
    if (len < max){
    that.setData({
      currentword: len,
      datas:datas
    });
  }
  },
  // 标题 内容 作者 类别
  articletitle:function(e){
    let datas = this.data.datas
    let value = e.detail.value
    datas["title"] = value
    this.setData({
      datas:datas
    })
  },
  chooseConfirm: function () {
    let that = this
    wx.showModal({
      title: '无法提交',
      content: '标题，内容，分类，朋友，该有的都不能少啊',
      confirmText: "确认呢",
      // cancelText: "辅助操作",
      success(res) {
        if (res.confirm) {
        } else {
          console.log("知道了")
        }
      }
    });
  },
  submit:function(){
    let that = this
    let author = app.globalData.id
    let datas = this.data.datas
    let httpurl = app.globalData.url
    datas["author"] = author
    wx.request({
      url: httpurl+"/articles/",
      method:"POST",
      data:datas,
      // header:{"Content-Type":"form-data",
      //         "Accept":"application/json"},
      success(res){
        if(res.statusCode==200){
          wx.redirectTo({
            url: '../article/articles',
          })
        }else{
            that.chooseConfirm();
        }
      }
    })
  }
})