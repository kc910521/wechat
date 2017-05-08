//index.js

//1,页面跳转，2地图移动事件后搜索及中心坐标x
//获取应用实例
var app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']
var Ut = require('../../utils/util.js'); 
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({//  ===================================page
  data: {
    motto: ['Hello World','ssssss'],
    userInfo: {},
    toView: 'red',
    scrollTop: 100,
    markerInfs: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    qqmapsdk = new QQMapWX({
        key: 'ITKBZ-XISRJ-ELIFN-FUJAP-XG4C5-RKFZE'
    });
  },
  onReady: function(){
    //  this.haveHttp()
    this.haveSearch('酒店',0);
  },
  searchConf: function(e){
    this.haveSearch(e.detail.value,0);
  },
  haveSearch: function(chars,pgno){
    var that = this
    qqmapsdk.search({
      keyword: chars,
      success: function(dt){
        console.log("11go");
        if (dt.status == 0){
          that.setData({
            markerInfs:Ut.converToShowPoint(dt.data)
          })
        }
        console.log(dt);

      },
      fail: function(res) {
          console.log(res);
      },
      complete: function(res) {
          console.log(res);
      }
    });
  },
  haveHttp: function(){
    wx.request({
      url: 'https://github.com/kc910521/asian_stronghold/blob/master/src/androidTest/java/com/ck/ind/finddir/ApplicationTest.java',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log('res succ');
        console.log(res);
        // success
      },
      fail: function(res) {
        console.log('res fail');
        console.log(res);
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  haveTap(e1){
    console.log(e1.type)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  redirectTo: function(params){
    console.log(params)
    wx.switchTab({
      url: "/pages/bdmap/bdmap",
      success: function(){
        console.log('ok')
      },
      fail: function(e){
        console.log(e)
      }
    })
  }
})
