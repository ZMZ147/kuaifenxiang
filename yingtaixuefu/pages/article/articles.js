// pages/article/articles.js
const bottom = require("../../utils/bottom.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 2,
    navbarTitle: [
      "奇葩说",
      "影视",
      "文章"
    ],
    shuoshuolist: {},
    oneword:"",
    readranks:[11,2,3,4,5,6,7,8,9,10],
    commentranks:[1,2,3,4,5,6,7,8,9,10],
    ranksheight:"",
    subdic:{"诗词":"shichi",
              "publish":"publish",
              "随笔":"suibi",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let height = wx.getSystemInfoSync().windowHeight-160
    // 拿到两大榜单的API
    let url = app.globalData.url

    wx.request({
      url: url+"/articles/",
      method:"GET",
      success(res){
        if(res.statusCode==200){
          let data = res.data
          that.setData({
            readranks:data.read,
            commentranks:data.click
          })
          wx.setStorage({
            key: 'read',
            data: data.read,
          })
          wx.setStorage({
            key: 'click',
            data: data.click,
          })  
        }
      }
    })

    // 每日一句的API
    wx.request({
      url: 'https://api.ooopn.com/ciba/api.php',
      method:"GET",
      success(res){
        if(res.statusCode==200){
          let word = res.data.ciba
          that.setData({
            oneword:word,
            ranksheight:height
          })
        }
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
    this.onLoad()
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
  onNavBarTap: function (event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    let to_list = {
      0: "shuo",
      1: "movie",
      2: "article"
    }
    let where = to_list[navbarTapIndex]
    wx.navigateTo({
      url: '../' + where + "/" + where + 's',
    })  
    // this.setData({
    //   navbarActiveIndex: navbarTapIndex
    // })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getlists:function(e){
    let leixing = e.currentTarget.dataset.type
    let keyword = this.data.subdic[leixing]
    let url = app.globalData.url
    wx.request({
      url: url+'/articles/',
      method:"GET",
      data:{
        'categary':leixing,
      },
      success(res){
        wx.setStorage({
          key: keyword,
          data: res.data,
        })
        wx.navigateTo({
          url: '../article_lists/list?name=' + keyword,
        })
      }
    })
    },
  onBindAnimationFinish: function ({ detail }) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
        let to_list = {
      0:"qishuo",
      1:"movie",
      2:"article"
    }
    let where = to_list[navbarTapIndex]
    wx.navigateTo({
      url: '../'+where+"/"+where+'s',
    })
    this.setData({
      navbarActiveIndex: detail.current
    })
  },
  plan:function(){
    // 自己的工作日志
    wx.navigateTo({
      url: '../dream/dreams',
    })
  },
  mypublish:function(e){
    // 拿到用户id  然后到后台去取到该用户相关的id
    let url = app.globalData.url
    let id = app.globalData.id
    wx.request({
      url: url+"/articles/",
      method:"GET",
      data:{"author":id},
      success(res){
        if(res.statusCode==200){
          wx.setStorage({
            key: 'publish',
            data: res.data,
            success:function(){
              wx.redirectTo({
                url: '../article_lists/list?name=publish',
              })
            }
          })

        }

      }
    })
  },
  writearticle:function(){
    wx.navigateTo({
      url: '../article_write/warticles',
    })
  },
  detail:function(e){
    let index = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../article_detail/details?index='+String(index)+"&type="+type,
    })
  }
})