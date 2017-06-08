//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onError: function(msg) {
    console.log('error happened:')
    console.log(msg)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.checkSession({
        success: function () {
          //session 未过期，并且在本生命周期一直有效
          wx.getUserInfo({
            success: function (res) {
              console.log("-----------------login000000000000");
              console.log(res);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        },
        fail: function () {
          //登录态过期
          //调用登录接口
          wx.login({
            success: function (obj) {
              console.log("logincode:" + obj.code);
              //调用成功，发送到我的服务器
              //我的服务器调用https://api.weixin.qq.com/sns/jscode2session?appid=wx2498223cf50c6e6c&secret=0783c95d3bf8074d41fd3fd3bd334b70&js_code=obj.code&grant_type=authorization_code
              /**
               * //正常返回的JSON数据包
{
      "openid": "OPENID",
      "session_key": "SESSIONKEY"
}
               */
              
              wx.getUserInfo({
                success: function (res) {
                  console.log("-----------------login000000000000");
                  console.log(res);
                  that.globalData.userInfo = res.userInfo
                  typeof cb == "function" && cb(that.globalData.userInfo)
                }
              })
            }
          })//---wxlogin
        }
      })


    }
  },
  globalData:{
    userInfo:null
  }

})