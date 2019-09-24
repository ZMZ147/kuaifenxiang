// pages/mdetail/details.js
var detailurl = wx.getStorageSync("moviedetail")
const bottom = require("../../utils/bottom.js")
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 能否拿到对象
    is_active: true,
    // 是否添加评论
    addcomment:false,
    // 是否展开评论列表
    is_comments:false,
    // 影片id
    id:"",
    // 影片对象
    item:"",
    // 评论列表
    comments:"",
    // 评论内容
    comment:"",
    // 当前页码
    page:1,
    height:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let index = options.index
    let that = this 
    let height = wx.getSystemInfoSync().windowHeight
    that.setData({
      height:height
    })
    wx.getStorage({
      key: 'movies',
      success: function(res) {
          let item = res.data[index]
          that.setData({
            id:id,
            item:item
          })
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
  onShareAppMessage:function() {

  },

  commentappend: function () {
    let that = this
    that.setData({
      addcomment: true
    })
  },
  com:function(e){
    let id = this.data.id
    this.setData({
      comment:e.detail.value
    })
  },
  submit:function(){
    let httpurl = app.globalData.url
    let id = this.data.id
    let content = this.data.comment
    let that = this
    wx.request({
      url: httpurl+"/movies/"+String(id)+"/",
      method:"PUT",
      data:{
        "from_where":String(id),
        "author":app.globalData.id,
        "content":content
      },
      success(res){
        if(res.statusCode==200){
          that.setData({
            addcomment:false
          })
        }
      }
      
    })
  },
  Comments:function(e){
    let id = e.currentTarget.dataset.id
    let data = {"keyword":"movies",
                "id":String(id),
                "method":"GET",
                "data":""
    }
    let that = this
    bottom.detail(data)
    .then(function(data){
      console.log(data)
      if(data.length>0){
        that.setData({
          comments :data,
          is_comments:true
        })
      }
    })
  },
  more:function(){
    let id = this.data.id
    let page = this.data.page
    let data = {
      "keyword": "movies",
      "id": String(id),
      "method": "GET",
      "data": page+1
    }
    let that = this
    bottom.detail(data)
      .then(function (data) {
        console.log(data)
        if (data.length > 0) {
          let comments = that.data.comments
          for (let item in data){
            comments.push(data[item])
          }
          that.setData({
            comments: comments,
            is_comments: true,
            page:page+1
          })
        }else{
          that.setData({
            "disableScroll": true
          })
        }
      })
  },
  want:function(e){
    let type = e.currentTarget.dataset.type
    let that = this
    let datas = {}
    if(type=="want"){
      datas["want"] = true
    }else{
      datas["wanted"] = true
    }
    let url = app.globalData.url
    let id = that.data.id
    
    wx.request({
      url: url+"/movies/"+String(id)+"/",
      method:"GET",
      data :datas,
      success(res){
        if(res.statusCode==200){
          that.setData({
            item:res.data
          })
        }else{
          console.log(res)
        }
      }
    })
  }
})