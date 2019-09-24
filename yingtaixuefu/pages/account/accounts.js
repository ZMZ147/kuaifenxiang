// pages/myself/myselfs.js
const bottom = require("../../utils/bottom.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      user:{},
      userdetail:{},
    personcolor:"greenyellow"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // var current_user = JSON.parse(options.user)
      console.log(app.globalData)
      var user =app.globalData.userInfo
      this.setData({
        user:user,
      })
      let that = this
      let id = app.globalData.id
      let httpurl = app.globalData.url
      wx.request({
        url: httpurl+"/users/"+String(id)+"/",
        success(res){
            let onedetail = res.data
            that.setData({
                userdetail:onedetail
            })
        }
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
  },
  decideConfirm: function () {
    let that = this
    wx.showModal({
      title: '您已签到，明天再来',
      content: '明天等你喔',
      confirmText: "确认",
      success(res) {
        if (res.confirm) {
        } else {
        }
      }
    });
  },
  changegrade:function(e){
    // 首先判断这个人今天是否已经签到过
    // 然后修改图片？
    let checksign = e.currentTarget.dataset.check
    let that = this 
    if(checksign==false){
      let httpurl = app.globalData.url
      let id = app.globalData.id
      wx.request({
        url: httpurl+"/users/"+String(id)+"/",
        method:"PUT",
        data:{"is_sign":true},
        success(res){
          if(res.statusCode==200){
            // 这个时候已经返回数据了
              that.setData({
                userdetail:res.data
              })
              // that.onLoad();
          }
        }
      })
    }else{
      that.decideConfirm()
    }
  },

  gotomovie: function () {
    bottom.gomovie();
  },
  gotoshuoshuo: function () {
    bottom.goshuoshuo();
  },
  gotoindex:function(){
    bottom.goindex();
  }
})