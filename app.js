//app.js
App({
  userInfoKey: 'USER_INFO',
  rootUrl: 'http://192.168.1.45:8089/business',
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
  updateUser: function(usr){
    //更新localstorage和全局变量
    let that = this;
    if (usr){
      //quanju
      that.globalData.userInfo.phone = usr.phone;
      if (usr.id){
        that.globalData.userInfo.uid = usr.id;
      }else{
        usr.id = that.globalData.userInfo.uid;
      }
      if (usr.avatarUrl) {
        that.globalData.userInfo.avatarUrl = usr.avatarUrl;
      }else{
        usr.avatarUrl = that.globalData.userInfo.avatarUrl;
      }
      that.globalData.userInfo.name = usr.name;
      that.globalData.userInfo.plateNumber = usr.plateNumber;
      //storage
      wx.setStorageSync(that.userInfoKey, usr)
    }else{
      console.log("update usr failed");
    }
  },
  getUserInfo:function(cb){
    console.log("666666666666666666666666662")
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      wx.checkSession({
        success: function () {
          //session 未过期，并且在本生命周期一直有效
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              let usrObj = wx.getStorageSync(that.userInfoKey);
              console.log(usrObj)
              if (usrObj) {
                that.globalData.userInfo.phone = usrObj.phone;
                that.globalData.userInfo.uid = usrObj.id;
                if (usrObj.avatarUrl){
                  that.globalData.userInfo.avatarUrl = usrObj.avatarUrl;
                }
                that.globalData.userInfo.name = usrObj.name;
                that.globalData.userInfo.plateNumber = usrObj.plateNumber;
              }else{
                console.log('未得到存储的用户，使用微信用户信息');
              }
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
                  that.globalData.userInfo = res.userInfo;
                  let usrObj = wx.getStorageSync(that.userInfoKey);
                  console.log(usrObj)
                  if (usrObj) {
                    that.globalData.userInfo.phone = usrObj.phone;
                    that.globalData.userInfo.uid = usrObj.id;
                    if (usrObj.avatarUrl) {
                      that.globalData.userInfo.avatarUrl = usrObj.avatarUrl;
                    }
                    that.globalData.userInfo.name = usrObj.name;
                    that.globalData.userInfo.plateNumber = usrObj.plateNumber;
                  } else {
                    console.log('未得到存储的用户，使用微信用户信息');
                  }
                  
                  typeof cb == "function" && cb(that.globalData.userInfo)
                }
              })
            }
          })//---wxlogin
        }
      })
    }
  },
  logout: function(succCb){
    let that = this;
    this.globalData.userInfo = null;
    wx.removeStorage({
      key: that.userInfoKey,
      success: function(res) {
        if (typeof succCb == "function"){
          succCb();
        }
      },
    })

  },
  globalData:{
    userInfo:null
  }

})