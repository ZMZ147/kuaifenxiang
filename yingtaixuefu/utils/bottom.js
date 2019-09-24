
const app = getApp()


function gomyselfs() {
  // var user = JSON.stringify(app.globalData)
  wx.redirectTo({
    url: '../account/accounts' ,

  })
}


function goindex() {
  wx.redirectTo({
    url: '../shuo/shuos',
  })
}

function goshuoshuo(){
  wx.navigateTo({
    url: '../shuo_write/shuoshuos',
  })
}

function gomovie(){
  wx.navigateTo({
    url: '../movie_upload/uploads',
  })
}

// 使用promise
function newrequest(data){
  var p = new Promise(function(resolve,reject){
    // 在这里做一些异步操作
    let httpurl = app.globalData.url
    // keyword是查什么  什么方法  还有什么数据
    wx.request({
      url: httpurl+"/"+data["keyword"]+"/",
      data:data["content"],
      method:data["method"],
      success(res){
        if(res.statusCode==200){
          resolve(res.data)
        }else{
          reject(res.statusCode)
        }
      }
    })
  })
  // 返回的是一个对象 或者数据
  return p
}

// 请求到数据之后 需要将他缓存  缓存当前需要的列表,以及关键字 还有当前页面
function newcache(data,list,keyword){
  var p = new Promise(function(resolve,reject){
    for (let item in data){
      list.push(data[item])
    }
    resolve(list)
    wx.setStorage({
      key: keyword,
      data: list,
    })
    setTimeout(function(){
    },6000)
  })
  return p
}

function detail(data){
  // 拿到关键字 拿到具体的id get一下 就来了
  let httpurl = app.globalData.url
  let p = new Promise(function(resolve,reject){
    wx.request({
      url: httpurl+"/"+data["keyword"]+"/"+data["id"]+"/",
      method:data["method"],
      data:data["data"],
      success(res){
        if(res.statusCode==200){
          resolve(res.data)
        }else{
          reject(res.statusCode)
        }
      }
    })
   
  })
  return p
}

function dianzan(id,index,onload){
// 文章id
  var p = new Promise(function(resolve,reject){
    let httpurl = app.globalData.url
    wx.request({
      url: httpurl + "/shuoshuos/" + String(id) + "/",
      method: "get",
      data: {
        dianzan: true
      },
      success(res) {
        if (res.statusCode == 200) {
          let newdata = res.data
          wx.getStorage({
            key: 'shuoshuos',
            success: function (res) {
              let lists = res.data
              lists[index] = newdata
              wx.setStorageSync('shuoshuos', lists)
              onload()
            },
          })
        }
      }
    })
  })
  return p
}
// 用来检查 点赞是否 合法 不合法 需要被取消
// 这一步 先拿到所有的点赞对象 
// 传入的是被点赞的对象的id 然后发送的是请求所有点赞对象的请求
function checklegal(data) { 
  var p = new Promise(function(resolve,reject){
      // 拿到传入什么对象的  什么id
      wx.request({
        url: app.globalData.url+"/"+data["keyword"]+"/"+String(data["id"])+"/",
        method:data["method"],
        success(res){
          if(res.statusCode==200){
            resolve(res.data)
          }else{
            reject(res)
          }
        }
      })
  })
  return p
}
function condition(data){
  let url = app.globalData.url
  let p = new Promise(function(resolve,reject){
    setTimeout(function () {
      wx.request({
        url: url + "/" + data["keyword"] + "/",
        method: data["method"],
        data:data["data"],
        success: function (res) {
          if (res.statusCode == 200) {
            resolve(res.data)
          } else {
            reject([])
          }
        }
      })
    }, 1000)
  })
  return p
}
// 传入绑定的userinfo 和 code
function login(){
  var p = new Promise(function(resolve,reject){
    wx.login({
      success(res){
        resolve(res.code)
      }
    })
  })
  return p
}
function getuser(data){
    let httpurl = getApp().globalData.url
    wx.request({
      url: httpurl+"/users/",
      method:"GET",
      data:data,
      success(res){
        if(res.statusCode==200){
          getApp().globalData.id = res.data
        }else{
          console.log(res)
        }
      }
    })
}
// 拿到数据之后应该马上放入到缓存里面？  然后点赞的时候 判断 是否在里面 如果在里面 那么假如is_cance参数

module.exports = {
  goindex: goindex,
  gomyselfs:gomyselfs,
  goshuoshuo:goshuoshuo,
  gomovie:gomovie,
  dianzan:dianzan,
  newrequest:newrequest,
  newcache:newcache,
  detail:detail,
  check:checklegal,
  condition:condition,
  login:login,
  getuser:getuser
}