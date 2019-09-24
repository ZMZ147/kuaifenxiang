//app.js
// const bottom = require("/utils/bottom.js")

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
 
    // 获取用户信息
    wx.getSetting({
      success: res => {
          // bottom.login()
          // .then(function(res){
          //   var user = getApp().globalData.userInfo
          //   console.log(user)
          //   var data = {"code":res,
          //               "username":user.nickName
          //   }
          //   bottom.getuser(data)
          // })
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              let user = res.userInfo
              let that = this
              let httpurl = that.globalData.url
              wx.login({
                success(res){
                    wx.request({
                      url: httpurl+'/users/',
                      method:"get",
                      data:{
                        "code":res.code,
                        'username':user.nickName
                      },
                      success(res){
                        if(res.statusCode==200){
                          // 这里吧穿回来的user的id加入到里面去
                          that.globalData.id = res.data
                          // app.globalData.userInfo = iduserInfo
                        } else {
                        }
                      }
                    })
                }
              })
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
    })
    // 跳转到首页
  },
  globalData: {
    userInfo: null,
    url:'https://www.zhujiadawu.top:443',
    // url:'http://127.0.0.1:8000',
    id:null
  }
})