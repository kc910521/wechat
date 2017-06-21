// login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vertified: false,
    phoneNumber: '',
    warnningInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  onShareAppMessage: function () {
  
  },
  changeCkbox: function(e){
    if (e.detail.value && e.detail.value.length > 0){
      this.setData({
        vertified: true
      });
    }else{
      this.setData({
        vertified: false
      });
    }
  },
  toLogin: function(e){
    let that = this;
    console.log('ss' + that.data.phoneNumber);
    wx.request({
      url: app.rootUrl + '/driver/login',
      method: 'POST',
      data: {
        phone: that.data.phoneNumber + '',
        verCode: '911'
      },
      success: (res) => {
        if (res.data && res.data.code == 0){
          //得到用户id
          let usr = res.data.payload;
          console.log(usr);
          wx.setStorage({
            key: app.userInfoKey,
            data: usr,
            success: () => {
              wx.switchTab({
                url: '/pages/me/me',
              })
            }
          })

        }else{
          that.setData({
            warnningInfo: res.data.description
          });
        }
      },
      fail: (e) => {
        that.setData({
          warnningInfo: '网络不稳定，登陆失败'
        });
        console.log(e);
      }
    })


  },
  bindKeyInput: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
})