// unlock.js
//获取应用实例  
var app = getApp();
var CryptoJS = require('../../utils/aes/crypto-js');
import btConn from '../../utils/bt/btConn'

let btc = new btConn();
let itfk = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loopTm: 0,
    lockDisabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //btc.createConn();
    
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
    this.loopCheck();
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(itfk);
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
  unlockNow: function(e) {
    btc.connTo('00:15:83:00:43:49',
      () => {
        //wx.showToast({ duration: 4000, title: "连接成功" });
        btc.sendCode('B434085CA1BF65E536A0DE80D7877D729FB2',
          (res) => {
            wx.showToast({ duration: 4000, title: "fasong成功" });
            // btc.sendOperCode('26F3DA55');
            wx.redirectTo({
              url: '/pages/parking/status',
            });
          },
          () => {
            wx.showToast({ duration: 4000, title: "fasong fail" });
          }
        )
      },
      () => {
        wx.showToast({ duration: 4000, title: "连接失败" });
      }
    );

  },
  loopCheck(){
    let that = this;
    itfk = setInterval(function(){
        if (that.data.loopTm < 500) {
          btc.createConn(
            () => {
              that.setData({
                lockDisabled: false
              });
              btc.search();
              clearInterval(itfk);
            },
            () => {
              that.data.loopTm++;
              that.setData({
                lockDisabled: true
              });
            }
          );
          
          btc.stopSearch();
        }else{
          clearInterval(itfk);
        }
      }
      ,6000)
  }
})