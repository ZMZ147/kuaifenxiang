// pages/article/articles.js
const bottom = require("../../utils/bottom.js")
const app = getApp()

const querydic= {
  "type": "全部",
  "country": "全部",
  "tag": "全部",
  "time": "全部"
}


Page({

  /**
   * 页面的初始数据
   */

  data: {
    navbarActiveIndex: 1,
    navbarTitle: [
      "奇葩说",
      "影视",
      "文章"
    ],
   vediotype:["全部","电影","电视剧"],
   vediocountry:['全部',"中国","日本","韩国","美国","印度","泰国","其他"],
   vediotag:["全部","喜剧","科幻","悬疑","剧情","武侠","玄幻","爱情","家庭","传记","记录","动作","恐怖"],
   vediotime:["全部","2019","2018","2017","2016","2015","2015以前"],

    scrollTop: 100,
    currenttype:querydic["type"],
    currentcountry:querydic["country"],
    currenttag:querydic["tag"],
    currenttime:querydic["time"],
    movielist:[],
    page:1,
    success:true,
    height:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let height = wx.getSystemInfoSync().windowHeight

    let that = this
    that.setData({
      height:height*0.7
    })
      wx.getStorage({
        key: 'movies',
        success: function(res) {
          that.setData({
            movielist:res.data
          })
        },
        fail:function(res){
          let data = {
            "keyword": "movies",
            "method": "GET",
            "content": {}
          }
          bottom.newrequest(data)
            .then(function (data) {
              let datas = data
              let lists = that.data.movielist
              let keyword = "movies"
              return bottom.newcache(datas,lists,keyword);
            })
            .then(function (data) {
                that.setData({
                  movielist:data,
                })
                that.onLoad()
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
  onBindAnimationFinish: function ({ detail }) {
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
    this.setData({
      navbarActiveIndex: detail.current
    })
  },

  // 点击了A就不能点击B
  choose:function(event){
  //每次点击都发送请求 延时发送请求  
    let that = this
    let current = event.currentTarget.dataset.nums
    let serachtype = current.split(":")
    querydic[serachtype[0]] = serachtype[1]
    // 这里不能用变量指代啊
    that.setData({
     currenttype:querydic["type"],
     currentcountry:querydic["country"],
     currenttag:querydic["tag"],
     currenttime:querydic["time"]
    })
    let data = {"method":"GET",
                "data":querydic,
                "keyword":"movies",
    }
    bottom.condition(data)
    .then(function(res){
      // 拿到新的数据  更新缓存 拿到新的数据 但是可能是空的
      if(res.length>0){
        // 说明数据不为空的话
        wx.setStorage({
          key: 'movies',
          data: res,
        })
        that.setData({
          success:true
        })
        that.onLoad();
      }else{
        that.setData({
          success:false
        })
      }
     
    })
   
  },
  moviedetail:function(e){
      let movieindex = e.currentTarget.dataset.index
      //这里将电影详情的api拿到 并且存储到本地缓存
      let movieid = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../movie_detail/details?id='+String(movieid)+"&index="+String(movieindex),
      })
  },

  more:function(e){
    // 拿到当前的页码
    let that = this
    let page = this.data.page
    let data = {"keyword":"movies",
                "content":{"page":page+1},
                "method":"GET"
    }
    bottom.newrequest(data)
      .then(function (data) {
        // 这里加入判断
        if(data.length>=1){
          let datas = data
          let lists = that.data.movielist
          let keyword = "movies"
          return bottom.newcache(datas, lists, keyword);
        }else{
          return false
        }

      })
      .then(function (data) {
        if(data == false){
          that.setData({
            "disableScroll": true
          })
        }else{
          that.setData({
            shuoshuolist: data,
            page: page + 1
          })
        }
        that.onLoad()
      })

  }
})
