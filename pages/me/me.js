// me.js
//获取应用实例
var app = getApp()

Page({
  data:{
    userInfo: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    //判断是否有登陆信息
    if (wx.getStorageSync('key')){

    }else{
      wx.setStorage({
        key: "key",
        data: "value"
      })
      // 页面显示
      wx.redirectTo({
        url: '/pages/me/login/login',
      })
    }


  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})