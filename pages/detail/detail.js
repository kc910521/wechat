// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495704444&di=55d77a35c27b1c8384c207502c6d6669&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.yhouse.com%2Flife%2Fimage%2F20140513%2F20140513155139_905.jpg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497522160007&di=0a16b8e28cb60208f484aaef5d4aaa78&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F25%2F20141025155720_Ws8rt.jpeg",
      "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497522159999&di=648c355454ba462902bc03e0f7e4f92e&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201505%2F09%2F20150509235715_Z42ri.jpeg"
    ],
    currImgUrl: null,
    currImgIdx: -1
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
    if (this.data.currImgUrl == null){  
      if (this.data.imgUrls.length > 0){
        this.setData({
          currImgUrl : this.data.imgUrls[0],
          currImgIdx : 0
        });
      }else{
        //set currimg to default
      }
    }
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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  toOrder : function(e){
    wx.navigateTo({
      url: '../../pages/order/have/confirm',
    })
  },
  toPrev: function(e){
    if (this.data.currImgIdx <= 0){

    }else{
      let that = this;
      this.setData({
        currImgUrl: this.data.imgUrls[-- that.data.currImgIdx]
      });
    }
  },
  toNxt: function(e){
    if (this.data.currImgIdx >= this.data.imgUrls.length-1) {

    } else {
      let that = this;
      this.setData({
        currImgUrl: this.data.imgUrls[++ that.data.currImgIdx]
      });
    }
  }
})