// me.js
//获取应用实例
var app = getApp()

Page({
  data:{
    userInfo: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // let that = this;
    // wx.getStorage({
    //   key: app.userInfoKey,
    //   success: function(res) {
    //     that.setData({
    //       userInfo: res
    //     })
    //   },
    // })
    //判断是否有登陆信息
    var that = this
    let usrObj = wx.getStorageSync(app.userInfoKey);
    if (usrObj) {
      console.log('usrObj--------------')
      console.log(usrObj)
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
      })
    } else {
      // 页面显示
      wx.redirectTo({
        url: '/pages/me/login/login',
      })
    }
  },
  logout: function(e){
    app.logout(()=>{
      wx.switchTab({
        url: '/pages/bdmap/bdmap',
      })
    });
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})