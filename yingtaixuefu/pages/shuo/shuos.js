const bottom = require("../../utils/bottom.js")
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    navbarTitle: [
      "奇葩说",
      "影视",
      "文章"
    ],
    color: "blue",
    qishuolists: [],
    // 滚动区域的高度
    height: null,
    contentheight: null,
    // 默认是当前页码为1 如果每次 请求 那么都把页码+1 并且将分段缓存
    page: 1,
    indexcolor:"green",
  },

  onLoad: function () {
    let height = wx.getSystemInfoSync().windowHeight - 110
    let contentheight = height / 2.5
    console.log(height, contentheight)
    let that = this
    wx.getStorage({
      key: 'shuoshuos',
      success: function (res) {
        that.setData({
          qishuolists: res.data,
          height: height,
          contentheight: contentheight
        })
      },
      fail: function () {
        wx.request({
          url: app.globalData.url + "/shuoshuos/",
          method: "GET",
          data: {
            'page': that.data.page
          },
          success(res) {
            if (res.statusCode == 200) {
              let newlists = res.data

              let lists = that.data.qishuolists
              for (let qipashuo in newlists) {
                lists.push(newlists[qipashuo])
              }
              wx.setStorage({
                key: "shuoshuos",
                data: lists,
              })
              that.setData({
                qishuolists: lists,
                height: height
              })
            } else {
              console.log("获取数据失败")
            }
          }
        })
      }
    })


  },
  /**
   * 点击导航栏
   */
  onNavBarTap: function (event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    let to_list = {
      0: "qishuo",
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
   * 
   */
  onShareAppMessage: function () {
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/page/index?id=123'
    }
  },
  onBindAnimationFinish: function ({ detail }) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: detail.current
    })
  },

  articledetail: function (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    // wx.navigateTo({
    //   url: '../qdetail/qdetails?key='+key,
    // })
    wx.navigateTo({
      url: '../shuo_detail/qdetails?index=' + String(index) + "&id=" + String(id),
    })
  },

  more: function () {
    let httpurl = app.globalData.url
    let that = this
    wx.request({
      url: httpurl + "/shuoshuos/",
      method: "get",
      data: {
        page: that.data.page + 1
      },
      success(res) {
        if (res.statusCode == 404) {
          that.setData({
            "disableScroll": true
          })
        } else {
          let lists = that.data.qishuolists
          for (let qipashuo in res.data) {
            lists.push(res.data[qipashuo])
          }
          that.setData({
            page: that.data.page + 1,
            qishuolists: lists
          })
          wx.setStorage({
            key: "shuoshuos",
            data: lists,
          })
        }
      },
    })
  },

  dianzan: function (e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    bottom.dianzan(id, index,that.onLoad)
    // that.onLoad();
  },
  gotomyself: function () {
    bottom.gomyselfs();
  },
  gotomovie: function () {
    bottom.gomovie()
  },
  gotoshuoshuo: function () {
    bottom.goshuoshuo()
  },
  sharingConfirm: function () {
    let that = this
    wx.showModal({
      title: '右上左边分享',
      content: '分享呢',
      confirmText: "确认呢",
      // cancelText: "辅助操作",
      success(res) {
        if (res.confirm) {
          console.log("分享了")
          
        } else {
          console.log("知道了")
        }
      }
    });
  },
  sharing:function(){
    this.sharingConfirm();
  }
})