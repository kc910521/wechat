// 引用百度地图微信小程序JSAPI模块 
// var bmap = require('../../libs/bmap-wx.js'); 
var Utils = require('../../utils/util.js'); 
var wxMarkerData = []; 
// var BMap = new bmap.BMapWX({ 
//     ak: 'r5e5Ixc2T1Icchws5mrL4E0RdTeHo1li' 
// }); 
var fail,success;

var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({ 
    data: { 
        markers: [], 
        allMarkers: [],
        latitude: 39, 
        longitude: 116, 
        placeData: {},
        searchInput: '',
        openLocationPm: {},
        controls: [{
            id: 99000,
            iconPath: '../../img/zen-icons-pencil.png',
            position: {
                left: 10,
                top: 370,
                width: 50,
                height: 50
            },
            clickable: true
        },{
            id: 99001,
            iconPath: '../../img/zen-icons-lock-open.png',
            position: {
              left: 170,
              top: 370,
              width: 50,
              height: 50
            },
            clickable: true
        }]
    }, 
    controltap(e) {
        console.log(e);
        if (e.controlId == 99000){
            this.mapCtx.moveToLocation()
        } else if (e.controlId == 99001){
            wx.navigateTo({
              url: '/pages/detail/detail',
            })
        }
    },
    onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
        this.mapCtx = wx.createMapContext('map')
        this.mapCtx.moveToLocation()
        //如果有传参，初始化地图内容
        
    },
    makertap: function(e) { 
        var that = this; 
        var id = e.markerId; 
        that.showSearchInfo(wxMarkerData, id); 
        // that.changeMarkerColor(wxMarkerData, id); 
    }, 
    onLoad: function(options) { 
        var that = this; 
        // 新建百度地图对象 
        qqmapsdk = new QQMapWX({
            key: 'ITKBZ-XISRJ-ELIFN-FUJAP-XG4C5-RKFZE'
        });
        // for(let idx = 0;idx < 10;idx ++){
        //     wxMarkerData.push(new pointObj(idx,
        //     39.903587906397 + (idx * 0.01000),
        //     116.40657977411 + (idx * 0.01000)
        //     ))
        // }
        // 调用接口
        if (options && options.id){
            setTimeout(function(){
                console.log(options);
                let dtog = {
                    id: options.id,
                    location: {
                        lat: options.lat,
                        lng: options.lng
                    },
                    tel: options.tel,
                    title: options.title,
                    address: options.add
                };
                that.setData({ 
                    markers: Utils.converToShowPoint([dtog]),
                    latitude: options.lat,
                    longitude: options.lng
                });
                wxMarkerData = [dtog]
                that.displayPointInf(dtog);
                wx.getLocation({
                    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                    success: function (res) {
                        console.log(res)
                        let aps = [];
                        aps = aps.concat(that.data.markers);
                        let dtog = {
                            id: 0,
                            location: {
                                lat: res.latitude,
                                lng: res.longitude
                            },
                            tel: 'options.telephone',
                            title: 'options.title',
                            address: 'options.add'
                        };
                        aps.push(dtog);
                        that.setData({ 
                            allMarkers: aps
                        });
                    },
                    cancel: function(e){
                        console.log("wx.getLocation error");
                    }
                });
            },300)
        };
        fail = function(data) { 
            console.log(data) 
        }; 
        success = function(data) { 
            
            wxMarkerData = data.data; 
            console.log(data)
            if (wxMarkerData.length > 0){
                that.setData({ 
                    markers: Utils.converToShowPoint(wxMarkerData)
                }); 
                // that.setData({ 
                //     latitude: wxMarkerData[0].location.lat 
                // }); 
                // that.setData({ 
                //     longitude: wxMarkerData[0].location.lng 
                // }); 
            }else {
                console.log('no data')
            }
        }//,

    }, 
    createMarker(point){
        let latitude = point.latitude; 
        let longitude = point.longitude; 
        let marker= {
            iconPath: "/image/location.png",
            id:point.id || 0,
            name:point.name || '',
            latitude: latitude,
            longitude: longitude,
            width: 25,
            height: 48,
            callout: { content: 'ccc', color: '#df3', fontSize: 20, bgColor: '#29a', borderRadius: 1, padding: 2, display:'ALWAYS' }
        };
        return marker;
    },
    calling: function (e) {
      let that = this;
      if (that.data.openLocationPm && that.data.openLocationPm.tel){
        wx.makePhoneCall({
          phoneNumber: that.data.openLocationPm.tel + '', //此号码并非真实电话号码，仅用于测试
          success: function () {
            console.log("拨打电话成功！" + that.data.openLocationPm.tel)
          },
          fail: function () {
            console.log("拨打电话失败！" + that.data.openLocationPm.tel)
          }
        })
      }
    },
    // btConn: function(){
    //   let that = this;
    //   console.log("btstart11111111111111111111111111");
    //   wx.openBluetoothAdapter({
    //     success: function (res) {
    //       console.log("btstart============================");
    //       console.log(res);
    //       wx.startBluetoothDevicesDiscovery({
    //         //services: ['FEE7'],
    //         success: function (res1) {
    //           wx.getBluetoothDevices({
    //             success: function (res44) {
    //               console.log(res44)
    //               that.setData({
    //                 bluetooth: JSON.stringify(res44)
    //               }); 
    //             }
    //           })
    //         }
    //       })
    //     }
    //   })
    // },
    // getCenterLocation: function () {
    //     this.mapCtx.getCenterLocation({
    //         success: function(res){
    //             console.log(res.longitude)
    //             console.log(res.latitude)
    //         }
    //     })
    // },
    searchChars: function (e){
        var that = this;
        let strs = e.detail.value;
        that.setData({ 
            searchInput: strs
        }); 
        console.log(this.data.searchInput)
        this.searchByPoint(strs,null);
    },
    searchByPoint: function(searchStr,ptObj){
      if (!searchStr && searchStr == ''){
        return;
      }
      console.log("whathapp?")
      console.log(ptObj)
      if (ptObj == undefined){
        qqmapsdk.search({
          keyword: searchStr,
          success: success,
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      }else{
        qqmapsdk.search({
          keyword: searchStr,
          success: success,
          location: ptObj,
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log(res);
          }
        });
      }
    },
    beginNav: function(e){
      if (this.data.openLocationPm){
        wx.openLocation(this.data.openLocationPm)
      }
    },
    showSearchInfo: function(data, i) { 
        var that = this; 
        console.log(data)
        for (let idx = 0;idx < data.length;idx ++){
            if (i == data[idx].id){
                let sdata = data[idx];
                that.displayPointInf(sdata);
                break;
            }
        }

    }, 
    displayPointInf: function(sdata){
      let ph1 = Utils.strTrim(sdata.tel);
        this.setData({ 
            placeData: { 
                title: '名称：' + sdata.title + '\n', 
                address: '地址：' + sdata.address + '\n', 
                longitude: '经度：' + sdata.location.lng + '\n', 
                latitude: '纬度：' + sdata.location.lat + '\n', 
                telephone: ph1 == '' ? null : ph1
            },
            openLocationPm: {
              latitude: Number(sdata.location.lat),
              longitude: Number(sdata.location.lng),
              name: sdata.title,
              address: sdata.address,
              tel: sdata.tel,
              scale: 11
            }
        });
        wx.navigateTo({
          url: '/pages/detail/detail',
        })
    },
    viewChange: function(e){
      
      let that = this;
      if (e.type === 'end' && this.mapCtx){
        console.log("--------------vc-----------------" + (e.type === 'end' && this.mapCtx));
        that.mapCtx.getCenterLocation({
          success: function (res) {
            console.log("hf");
            console.log(res.latitude)
            that.searchByPoint(that.data.searchInput,{
              latitude: res.latitude,
              longitude: res.longitude
            });
          }
        })
      }
    }
})
