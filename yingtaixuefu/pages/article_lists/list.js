// pages/articlelist/list.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    typename: "",
    datalists: [],
    whichchoose:"",
    redic: {
      "shichi": "诗词",
      "publish": "我的发表",
      "suibi": "随笔",
    },
    height:"",
    length:true,
    initial:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let leixing = options.name
    let typename = that.data.redic
    let initial = that.data.initial
    initial.name = leixing
    let height = wx.getSystemInfoSync().windowHeight-70
    that.setData({
      height:height,
      initial:initial
    })
    wx.getStorage({
      key: leixing,
      success: function (res) {
        let datalists = res.data
        if(datalists.length>0){
          that.setData({
            datalists: datalists,
            typename: typename[leixing],
        })}else{
          that.setData({
            length:false
          })
        }
      },
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
    let options = new Object( this.data.initial) 
    this.onLoad(options);
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
  getdetail: function (event) {
    let index = event.currentTarget.dataset.index
    let typename = this.data.initial["name"]
    console.log(typename)
    wx.navigateTo({
      url: '../article_detail/details?index='+index+"&type="+typename,
    })
  },

})