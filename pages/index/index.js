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
    toView: 'red',
    scrollTop: 100,
    markerInfs: []
  },
  onShareAppMessage: function () {
    return {
      title: '自定义转发标题',
      path: '/page/index?id=123',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //事件处理函数
  goToPos:function(e){
    console.log(e);
    let bobj = e.currentTarget.dataset;
    let openLocationPm = {
      latitude: Number(bobj.latitude),
      longitude: Number(bobj.longitude),
      name: bobj.title,
      address: bobj.address,
      tel: bobj.telephone,
      scale: 11
    };
    wx.openLocation(openLocationPm)
    // wx.navigateTo({
    //   url: '/pages/bdmap/bdmap?id='
    //     + bobj.id + '&lat=' 
    //     + bobj.latitude + '&lng=' 
    //     + bobj.longitude + '&add=' 
    //     + bobj.address + '&title=' 
    //     + bobj.title + '&tel=' 
    //     + bobj.telephone
    // })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

    qqmapsdk = new QQMapWX({
        key: 'ITKBZ-XISRJ-ELIFN-FUJAP-XG4C5-RKFZE'
    });
  },
  onReady: function(){
    //  this.haveHttp()
    this.haveSearch('停车场',0);
  },
  searchConf: function(e){
    this.haveSearch(e.detail.value,0);
  },
  haveSearch: function(chars,pgno){
    var that = this
    qqmapsdk.search({
      keyword: chars,
      success: function(dt){
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
  },
  orderPos: function (e) {
    wx.navigateTo({
      url: '../../pages/order/list/list',
    })
  }
})
