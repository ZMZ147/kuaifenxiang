// pages/qdetail/qdetails.js

const app = getApp()
const bottom = require("../../utils/bottom.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {

    item:[],
    height:null,
    width:null,
    content:null,
    commentlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let key = options.index
      let that = this
      wx.getStorage({
        key: 'shuoshuos',
        success: function(res) {
            console.log(res.data,key)
            console.log(res.data[key])
            let datadetail = res.data[key]
            console.log(datadetail.height)
            that.setData({
              item:datadetail
            })
        },
      })
      let height = wx.getSystemInfoSync().windowHeight
      let width = wx.getSystemInfoSync().windowWidth
      that.setData({
        height:height,
        width:width
      })
      let httpurl = app.globalData.url
      let id = options.id
      wx.request({
        url: httpurl+"/shuoshuos/"+String(id)+"/",
        success(res){
          that.setData({
            commentlist:res.data
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
  dianzan:function(e){
    let id = e.currentTarget.data.id
    bottom.dianzan(id);
  },
  comment:function(e){
    let content = e.detail.value
    this.setData({
      content:content
    })
  },

  dianzan:function(e){
    let id= e.currentTarget.data.id
  },
  
  commentsubmit:function(e){
    let content = this.data.content
    let from_where = this.data.item.id
    let author = app.globalData.id
    wx.request({
      url: app.globalData.url + "/shuoshuos/" + String(from_where) + "/",
      method: "PUT",
      data: {
        content: content,
        from_where: from_where,
        author: author
      },
      success(res) {
        if (res.statusCode == 200) {
          // wx.clearStorage()
          wx.removeStorage({
            key: 'shuoshuos',
            success: function(res) {
              bottom.goindex();
            },
          })
          
        } else {
          console.log("错了")
        }
      }
    })
  }
})