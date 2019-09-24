// pages/dream/dreams.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"可怕的不是平凡，而是平庸",
    axis: [],
    is_add:false,
    is_content:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  changetitle:function(){
      
      this.setData({
        is_content:false
      })
     
  },
  newTitle:function(e){
    this.setData({
        title:e.detail.value
    })
  },
  submitchange:function(){
    this.setData({
      is_content:true
    })
    console.log(this.data.is_content)
  },
  adddream:function(){
    this.setData({
      is_add:true
    })
  },

})