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
        latitude: 0, 
        longitude: 0, 
        placeData: {},
        searchInput: '',
        controls: [{
            id: 99000,
            iconPath: '../../img/marker_yellow.png',
            position: {
                left: 10,
                top: 350,
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
        if (options && options.title){
            console.log(options);
            let dtog = {
                id: 41,
                location: {
                    lat: options.lat,
                    lng: options.lng
                },
                tel: options.telephone,
                title: options.title,
                address: options.add
            };
            that.setData({ 
                markers: Utils.converToShowPoint([dtog]),
                latitude: options.lat,
                longitude: options.lng
            });
            wxMarkerData = [dtog]
            this.displayPointInf(dtog);

        }
        fail = function(data) { 
            console.log(data) 
        }; 
        success = function(data) { 
            
            wxMarkerData = data.data; 
            console.log("-----------------------------------" + wxMarkerData.length)
            console.log(data)
            if (wxMarkerData.length > 0){
                that.setData({ 
                    markers: Utils.converToShowPoint(wxMarkerData)
                }); 
                that.setData({ 
                    latitude: wxMarkerData[0].location.lat 
                }); 
                that.setData({ 
                    longitude: wxMarkerData[0].location.lng 
                }); 
            }else {
                console.log('no data')
            }
        }//,
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
            height: 48
        };
        return marker;
    },
    // getCenterLocation: function () {
    //     this.mapCtx.getCenterLocation({
    //         success: function(res){
    //             console.log(res.longitude)
    //             console.log(res.latitude)
    //         }
    //     })
    // },
    searchChars: function (e){
        console.log("---333----")
        var that = this;
        let strs = e.detail.value;
        console.log("---333----" + strs)
        that.setData({ 
            searchInput: strs
        }); 
        console.log(this.data.searchInput)
        qqmapsdk.search({
            keyword: strs,
            success: success,
            fail: function(res) {
                console.log(res);
            },
            complete: function(res) {
                console.log(res);
            }
        });
        // BMap.search({ 
        //     "query": e.detail.value, 
        //     fail: fail, 
        //     success: success, 
        //     // 此处需要在相应路径放置图片文件 
        //     iconPath: '../../img/marker_red.png', 
        //     // 此处需要在相应路径放置图片文件 
        //     iconTapPath: '../../img/marker_yellow.png' 
        // }); 
    },
    showSearchInfo: function(data, i) { 
        var that = this; 
        console.log('------------============-------------' + i)
        console.log(data)
        for (let idx = 0;idx < data.length;idx ++){
            if (i == data[idx].id){
                let sdata = data[idx];
                this.displayPointInf(sdata)
                wx.openLocation({
                    latitude: sdata.location.lat,
                    longitude: sdata.location.lng,
                    name: sdata.title,
                    address: sdata.address,
                    scale:11
                })
            }
        }

    }, 
    displayPointInf: function(sdata){
        this.setData({ 
            placeData: { 
                title: '名称：' + sdata.title + '\n', 
                address: '地址：' + sdata.address + '\n', 
                longitude: '经度：' + sdata.location.lng + '\n', 
                latitude: '纬度：' + sdata.location.lat + '\n', 
                telephone: '电话：' + sdata.tel
            } 
        });
    },
    viewChange: function(e){
        // console.log("--------------vc-----------------")
        // console.log(e)
    }
})

