//index.js
//获取应用实例
const app = getApp()
const bottom= require('../../utils/bottom.js')
const httpurl = app.globalData.url


Page({
  data: {
    motto: 'Hello World,欢迎来到快分享',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    let that = this
    let user = e.detail.userInfo
    app.globalData.userInfo =user
    that.setData({
      userInfo: user,
      hasUserInfo: true
    })
    bottom.login()
    .then(function(res){
      console.log(res)
      let data= {
        "code": res,
          'username': user.nickName
      }
     bottom.getuser(data)
    })
    console.log(app.globalData)
  },

  test:function(){
    wx:wx.redirectTo({
      url: '../shuo/shuos',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onNavBarTap: function (event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },
  onBindAnimationFinish: function ({ detail }) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: detail.current
    })
  },
  gotomyself: function () {
    bottom.gomyselfs();
  },
  gotomovie: function () {
    bottom.gomovie();
  },
  gotoshuoshuo: function () {
    bottom.goshuoshuo();
  }
})
