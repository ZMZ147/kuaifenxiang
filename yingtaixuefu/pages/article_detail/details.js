// pages/adetail/details.js


const bottom = require("../../utils/bottom.js")
const app = getApp()
// let datalists = wx.getStorageInfoSync(leixing)

Page({

  /**
   * 页面的初始数据
   */
  data: {

    oneinstance:[],
    redic:{"诗词":"shichi",
            "我的发表":"publish",
            "随笔":"suibi",
    },
    height:"",
    color:"white",
    is_click:false,
    check:"",
    // 点击的缓存类型
    keyword:"",
    // 缓存的数组中的索引
    index:"",
    datalist:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index
    console.log(index)
    let typename = options.type
    let that = this
    let height = wx.getSystemInfoSync().windowHeight-100
    let dic = that.data.redic

    // 说明是从前面跳转过来的
    if (dic[typename]){
      var keyword = dic[typename]
    }else{
      var keyword = typename
    }
    that.setData({
      height: height,
      keyword:keyword,
      index:index
    })
    wx.getStorage({
      key: keyword,
      success: function(res) {
          let datalist = res.data
          // 这里的id其实是索引
          that.setData({
            datalist:datalist
          })
          var datadetail = datalist[index]
          let datas = {
            "keyword": "articles",
            "id": datadetail.id,
            "method": "GET",
          }
          bottom.check(datas)
            .then(function (res) {
              // 这里返回数据
              let updateobj = res["readupdate"]
              datalist[index] = updateobj
              wx.setStorage({
                key: keyword,
                data: datalist,
              })
              console.log(res)
              let lists = res["clickerobj"]["who_list"]
              if (lists.length > 0) {
                if (lists.indexOf(app.globalData.id) >= 0) {
                  // 说明在里面
                  that.setData({
                    color: "gray",
                    is_click: true,
                  })
                }
              }
              return lists
            })
            .then(function(res){
              that.setData({
                check:res
              })
            })
          that.setData({
            oneinstance:datadetail
          })          
      },

      // 从第一个界面跳过来的话 是没有缓存的 那么 直接发起请求
    })
    // 我要拿到这个文章的id
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
  // 拿到该文章id 然后发送请求

  setnewdata: function (keyword, index, datalist, data) {
    datalist[index] = data
    wx.setStorage({
      key: keyword,
      data: datalist,
    })
  },
  submit:function(e){
    let id = e.currentTarget.dataset.id
    let httpurl = app.globalData.url
    let user = app.globalData.id
    let that = this 
    let url = httpurl + "/articles/" + String(id) + "/"
    if (that.data.is_click == true) {
      wx.request({
        url: url,
        method: "PUT",
        data: { "from_where": user,
        "is_cance":true},
        success(res) {
          if (res.statusCode == 200) {
            that.setData({
              color: "white",
              is_click:false,
            })
            let datalist = that.data.datalist
            let index = that.data.index
            let keyword = that.data.keyword
            that.setnewdata(keyword,index,datalist,res.data);
          }
        }
      })}
    else {
      wx.request({
        url: url,
        method: "PUT",
        data: { "from_where": user,
        },
        success(res) {
          if (res.statusCode == 200) {
            that.setData({
              color: "gray",
              is_click:true,
            })
            let datalist = that.data.datalist
            let index = that.data.index
            let keyword = that.data.keyword
            that.setnewdata(keyword, index, datalist, res.data);
          }
        }
      })}
  },

})