// pages/shuoshuo/shuoshuos.js
const app = getApp()
const bottom = require("../../utils/bottom.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorlist: ["RosyBrown", "#00FFFF", "#DAA520", "#F08080", "#FFB6C1","#48D1CC",
      "#8470FF", "#B0C4DE", "#00FA9A", "#6B8E23"," #800080"],
    color: "RosyBrown",
    content:"",
    fontcolor:"white",
    is_legal:true,
    currentnum:"",
    height:"",
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let height = wx.getSystemInfoSync().screenHeight
    this.setData({
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

  },
  changecolor:function(event){
    let color = event.currentTarget.dataset.color
    this.setData({
      color:color
    })
  },
  decideConfirm: function () {
    let that = this 
    wx.showModal({
      title: '无法提交',
      content: '请刷新本界面',
      confirmText: "确认呢",
      // cancelText: "辅助操作",
      success(res) {
        if (res.confirm) {
            that.setData({
              content:""
            })
        } else {
          // console.log("知道了")
          that.onLoad();
        }
      }
    });
  },

  submit:function(){
    let that = this
    let id = app.globalData.id
    let color = this.data.color
    let content = this.data.content
    let httpurl = app.globalData.url

    if (that.data.is_legal== true){
      wx.request({
        url: httpurl + "/shuoshuos/",
        method: 'post',
        data: {
          background: color,
          content: content,
          owner: id,
        },
        success(res) {
          if (res.statusCode == 200) {
            wx.removeStorageSync('shuoshuos')
            wx.clearStorage()
            bottom.goindex();
          } else {
          }
        }
      })
    }else{     
      that.decideConfirm()
      that.onLoad();
      that.setData({
        is_legal:true
      })
    }
  },
  openConfirm: function () {
    wx.showModal({
      title: '输入出错',
      content: '能不能稍微正经点？不要一直？？？或者$$$$',
      confirmText: "确认呢",
      // cancelText: "辅助操作",
      success:function(res){
        console.log(res)
        if(res.confirm==true){
          console.log("确认呢")
        }else{
          console.log("知道了")
        }
      }
    });
  },
  qipashuo:function(event){
    let value = event.detail.value
    let color = event.currentTarget.dataset.color
    var check = new RegExp("['?'|'$'|？]*", "g");
    let that = this
    that.setData({
      currentnum:value.length
    })
    let result = check.exec(value);
    console.log(result)
    if(result[0].length>10){
        that.setData({
          is_legal:false
        })
        that.openConfirm();
      }
    if (that.data.is_legal==true){
      that.setData({
        color: color,
        content: value,
      })
    }
    // 传文章  需要的背景颜色和内容

  }
})