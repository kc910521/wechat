
//获取应用实例  
var app = getApp();
var CryptoJS = require('../../utils/aes/crypto-js'); 
import btConn from '../../utils/bt/btConn'

let btc = new btConn();

Page({
  data: {
    status: "",
    sousuo: "",
    connectedDeviceId: "", //已连接设备uuid  
    services: "", // 连接设备的服务  
    characteristics: "",   // 连接设备的状态值  
    writeServicweId: "", // 可写服务uuid  
    writeCharacteristicsId: "",//可写特征值uuid  
    readServicweId: "", // 可读服务uuid  
    readCharacteristicsId: "",//可读特征值uuid  
    notifyServicweId: "", //通知服务UUid  
    notifyCharacteristicsId: "", //通知特征值UUID  
    inputValue: "",
    characteristics1: "", // 连接设备的状态值  
    passwd: ""
  },
  onLoad: function () {
    if (wx.openBluetoothAdapter) {
      wx.openBluetoothAdapter()
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示  
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

  },
  // 初始化蓝牙适配器  
  lanya1: function () {
    var that = this;
    btc.createConn();
    // wx.openBluetoothAdapter({
    //   success: function (res) {
    //     that.setData({
    //       msg: "初始化蓝牙适配器成功！" + JSON.stringify(res),
    //     })
    //     //监听蓝牙适配器状态  
    //     wx.onBluetoothAdapterStateChange(function (res) {
    //       that.setData({
    //         sousuo: res.discovering ? "在搜索。" : "未搜索。",
    //         status: res.available ? "可用。" : "不可用。",
    //       })
    //     })
    //   }
    // })
  },
  // 本机蓝牙适配器状态  
  lanya2: function () {
    var that = this;
    btc.status();
    // var key = CryptoJS.enc.Hex.parse('A0201052062000000000010000000000');
    // var iv = CryptoJS.enc.Hex.parse('0000000000000000' + '0000000000000000');
    // var lval = CryptoJS.enc.Hex.parse('40FFFFFFFFFFFFFFFFFFFFFF224D5EAB');
    // let encrypted = CryptoJS.AES.encrypt(lval, key,
    //   { iv: iv, 
    //   algorithm: CryptoJS.algo.AES,
    //   mode: CryptoJS.mode.CBC, 
    //   padding: CryptoJS.pad.NoPadding });
    // let aaa2 = encrypted.ciphertext.toString().toUpperCase() +'9FB2';
    // console.log('===========jiami============');
    // console.log(aaa2);

    // let orgcode = codeToStr(aaa2);
    // if (true){
    //   //has code...
    //   let realCode = orgcode.substring(2, orgcode.length - 8);
    //   console.log(realCode);
    //   let openCode = '40' + realCode + '26F3DA55' ;
    // }

    // console.log('===========jiami========ov====');
    // wx.getBluetoothAdapterState({
    //   success: function (res) {
    //     that.setData({
    //       msg: "本机蓝牙适配器状态" + "/" + JSON.stringify(res.errMsg),
    //       sousuo: (res.discovering ? "在搜索。" : "未搜索。") + aaa2,
    //       status: res.available ? "可用。" : "不可用。",
    //     })
    //     //监听蓝牙适配器状态  
    //     wx.onBluetoothAdapterStateChange(function (res) {

    //       that.setData({
    //         sousuo: (res.discovering ? "在搜索。" : "未搜索。") ,
    //         status: res.available ? "可用。" : "不可用。",
    //       })
    //     })
    //   }
    // })
  },
  //搜索设备  
  lanya3: function () {
    var that = this;
    btc.search();
    // wx.startBluetoothDevicesDiscovery({
    //   //services: ['0000ffe0-0000-1000-8000-00805f9b34fb'],
    //   success: function (res) {
    //     that.setData({
    //       msg: "搜索设备" + JSON.stringify(res),
    //     })
    //     //监听蓝牙适配器状态  
    //     wx.onBluetoothAdapterStateChange(function (res) {
    //       that.setData({
    //         sousuo: res.discovering ? "在搜索。" : "未搜索。",
    //         status: res.available ? "可用。" : "不可用。",
    //       })
    //     })
    //   }
    // })
  },
  // 获取所有已发现的设备  
  lanya4: function () {
    var that = this;
    btc.listDevices(
      (res) => {
        console.log(res);
        that.setData({
          msg: "搜索设备" + res.devices.length +":" + JSON.stringify(res.devices),
          devices: res.devices,
        })
      }
    );
    // wx.getBluetoothDevices({
    //   success: function (res) {
    //     //是否有已连接设备  
    //     wx.getConnectedBluetoothDevices({
    //       success: function (res) {
    //         console.log(JSON.stringify(res.devices));
    //         that.setData({
    //           connectedDeviceId: res.deviceId
    //         })
    //       }
    //     })

    //     that.setData({
    //       msg: "搜索设备" + res.devices.length +":" + JSON.stringify(res.devices),
    //       devices: res.devices,
    //     })
    //     //监听蓝牙适配器状态  
    //     wx.onBluetoothAdapterStateChange(function (res) {
    //       that.setData({
    //         sousuo: res.discovering ? "在搜索。" : "未搜索。",
    //         status: res.available ? "可用。" : "不可用。",
    //       })
    //     })
    //   }
    // })
  },
  //停止搜索周边设备  
  lanya5: function () {
    var that = this;
    btc.stopSearch();
    // wx.stopBluetoothDevicesDiscovery({
    //   success: function (res) {
    //     that.setData({
    //       msg: "停止搜索周边设备" + "/" + JSON.stringify(res.errMsg),
    //       sousuo: res.discovering ? "在搜索。" : "未搜索。",
    //       status: res.available ? "可用。" : "不可用。",
    //     })
    //   }
    // })
  },
  //连接设备  
  connectTO: function (e) {
    var that = this;
    console.log(e.currentTarget.id);
    btc.connTo('00:15:83:00:43:49');
    // console.log('e.currentTarget.id:' + e.currentTarget.id);
    // wx.createBLEConnection({
    //   deviceId: e.currentTarget.id,
    //   success: function (res) {
    //     that.setData({
    //       connectedDeviceId: e.currentTarget.id,
    //       msg: "已连接" + e.currentTarget.id,
    //       msg1: "",
    //     })
    //   },
    //   fail: function () {
    //     console.log("调用失败");
    //   },
    //   complete: function () {
    //     console.log("调用结束");
    //   }
    // })
    
  },
  // 获取连接设备的service服务  
  lanya6: function () {
    var that = this;
    wx.getBLEDeviceServices({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.data.connectedDeviceId,
      success: function (res) {
        console.log('device services:', JSON.stringify(res.services));
        that.setData({
          services: res.services,
          msg: JSON.stringify(res.services),
        })
      }
    })
  },
  //获取连接设备的所有特征值  for循环获取不到值  
  lanya7: function () {
    var that = this;
    // wx.getBLEDeviceCharacteristics({
    //   // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
    //   deviceId: that.data.connectedDeviceId,
    //   // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
    //   serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',//that.data.services[0].uuid,
    //   success: function (res) {
    //     for (var i = 0; i < res.characteristics.length; i++) {
    //       if (res.characteristics[i].properties.notify) {
    //         console.log("11111111", that.data.services[0].uuid);
    //         console.log("22222222222222222", res.characteristics[i].uuid);
    //         that.setData({
    //           notifyServicweId: that.data.services[0].uuid,
    //           notifyCharacteristicsId: res.characteristics[i].uuid,
    //         })
    //       }
    //       if (res.characteristics[i].properties.write) {
    //         that.setData({
    //           writeServicweId: that.data.services[0].uuid,
    //           writeCharacteristicsId: res.characteristics[i].uuid,
    //         })

    //       } else if (res.characteristics[i].properties.read) {
    //         that.setData({
    //           readServicweId: that.data.services[0].uuid,
    //           readCharacteristicsId: res.characteristics[i].uuid
    //         })

    //       }
    //     }
    //     console.log('device getBLEDeviceCharacteristics:', res.characteristics);

    //     that.setData({
    //       msg: JSON.stringify(res.characteristics),
    //     })
    //   },
    //   fail: function () {
    //     console.log("fail");
    //   },
    //   complete: function () {
    //     console.log("complete");
    //   }
    // })

    // wx.getBLEDeviceCharacteristics({
    //   // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
    //   deviceId: that.data.connectedDeviceId,
    //   // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
    //   serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',
    //   // that.data.services[1].uuid,
    //   success: function (res) {
    //     for (var i = 0; i < res.characteristics.length; i++) {
    //       if (res.characteristics[i].properties.notify) {
    //         that.setData({
    //           notifyServicweId: that.data.services[1].uuid,
    //           notifyCharacteristicsId: res.characteristics[i].uuid,
    //         })
    //       }
    //       if (res.characteristics[i].properties.write) {
    //         that.setData({
    //           writeServicweId: that.data.services[1].uuid,
    //           writeCharacteristicsId: res.characteristics[i].uuid,
    //         })

    //       } else if (res.characteristics[i].properties.read) {
    //         that.setData({
    //           readServicweId: that.data.services[1].uuid,
    //           readCharacteristicsId: res.characteristics[i].uuid,
    //         })

    //       }
    //     }
    //     console.log('device getBLEDeviceCharacteristics1:', res.characteristics);

    //     that.setData({
    //       msg1: JSON.stringify(res.characteristics),
    //     })
    //   },
    //   fail: function () {
    //     console.log("fail1");
    //   },
    //   complete: function () {
    //     console.log("complete1");
    //   }
    // })
  },
  //断开设备连接  
  lanya0: function () {
    var that = this;
    wx.closeBLEConnection({
      deviceId: that.data.connectedDeviceId,
      success: function (res) {
        that.setData({
          connectedDeviceId: "",
        })
      }
    })
  },
  //监听input表单  
  inputTextchange: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  openLock: function(){
    btc.sendOperCode('26F3DA55');
    // var that = this;
    // console.log('passwd' + that.data.passwd);
    // if (that.data.passwd){
    //   let hstr = that.data.passwd;
    //   let openCode = '40' + hstr + '26F3DA55';
    //   //加密
    //   let ededCode = hexToCode(openCode);
    //   console.log('ededCode:' + ededCode);
    //   let crccode = crcTableSimple(Str2Bytes(ededCode));
    //   console.log('crccode:' + crccode);

      
    //   let oarray = Str2Bytes(ededCode + '' + crccode);
    //   let buffer = new ArrayBuffer(18)
    //   let dataView = new DataView(buffer)
    //   for (var i = 0; i < oarray.length; i++) {
    //     dataView.setInt8(i, oarray[i]);
    //   }
    //   wx.writeBLECharacteristicValue({
    //     // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
    //     deviceId: that.data.connectedDeviceId,
    //     // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
    //     serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',// that.data.writeServicweId,
    //     // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
    //     characteristicId: '0000ffe1-0000-1000-8000-00805f9b34fb',// that.data.writeCharacteristicsId,
    //     // 这里的value是ArrayBuffer类型  
    //     value: buffer,
    //     success: function (res) {
    //       that.setData({
    //         jieshou: JSON.stringify(res)
    //       })
    //       console.log('writeBLECharacteristicValue success 4 lock', res.errMsg)
    //     }
    //   })
    // }
  },
  lockIt: function () {
    btc.sendOperCode('F32655DA');
    // var that = this;
    // console.log('passwd' + that.data.passwd);
    // if (that.data.passwd) {
    //   let hstr = that.data.passwd;
    //   let openCode = '40' + hstr + 'F32655DA';
    //   //加密
    //   let ededCode = hexToCode(openCode);
    //   console.log('ededCode:' + ededCode);
    //   let crccode = crcTableSimple(Str2Bytes(ededCode));
    //   console.log('crccode:' + crccode);


    //   let oarray = Str2Bytes(ededCode + '' + crccode);
    //   let buffer = new ArrayBuffer(18)
    //   let dataView = new DataView(buffer)
    //   for (var i = 0; i < oarray.length; i++) {
    //     dataView.setInt8(i, oarray[i]);
    //   }
    //   wx.writeBLECharacteristicValue({
    //     // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
    //     deviceId: that.data.connectedDeviceId,
    //     // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
    //     serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',// that.data.writeServicweId,
    //     // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
    //     characteristicId: '0000ffe1-0000-1000-8000-00805f9b34fb',// that.data.writeCharacteristicsId,
    //     // 这里的value是ArrayBuffer类型  
    //     value: buffer,
    //     success: function (res) {
    //       that.setData({
    //         jieshou: JSON.stringify(res)
    //       })
    //       console.log('writeBLECharacteristicValue success 4 lock', res.errMsg)
    //     }
    //   })
    // }
  },
  //发送  
  lanya8: function () {
    var that = this;
    btc.onNotify(null);
    btc.sendCode('');

    // 这里的回调可以获取到 write 导致的特征值改变  
    // wx.onBLECharacteristicValueChange(function (characteristic) {
    //   console.log("===================== characteristic be here ===========================");
    //   let hex = Array.prototype.map.call(new Uint8Array(characteristic.value), x => ('00' + x.toString(16)).slice(-2)).join('');//00
    //   let orgcode = codeToStr(hex);
    //   console.log("---------hex-----------");
    //   console.log(hex + '');
    //   console.log(orgcode);
    //   console.log(characteristic);
    //   console.log("-----------hex");
    //   //发送开锁 passwd
    //   if (true) {
    //     //has code...
    //     let realCode = orgcode.substring(2, orgcode.length - 12);
    //     console.log('realCode:'+realCode);
    //     that.setData({
    //       passwd: realCode
    //     })

    //   }
      
    // })
    // let oarray = Str2Bytes('B434085CA1BF65E536A0DE80D7877D729FB2');
    // console.log('oarray' + that.data.connectedDeviceId);
    // console.log(oarray);
    // let buffer = new ArrayBuffer(18)
    // let dataView = new DataView(buffer)
    // for (var i = 0; i < oarray.length; i++) {
    //   dataView.setInt8(i, oarray[i]);
    // }

    // wx.writeBLECharacteristicValue({
    //   // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
    //   deviceId: that.data.connectedDeviceId,
    //   // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
    //   serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',// that.data.writeServicweId,
    //   // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
    //   characteristicId: '0000ffe1-0000-1000-8000-00805f9b34fb',// that.data.writeCharacteristicsId,
    //   // 这里的value是ArrayBuffer类型  
    //   value: buffer,
    //   success: function (res) {
    //     that.setData({
    //       jieshou: JSON.stringify(res)
    //     })
    //     console.log('writeBLECharacteristicValue success', res.errMsg)
    //   }
    // })


  },
  //启用低功耗蓝牙设备特征值变化时的 notify 功能  
  lanya9: function () {
    var that = this;
    //var notifyServicweId = that.data.notifyServicweId.toUpperCase();  
    //var notifyCharacteristicsId = that.data.notifyCharacteristicsId.toUpperCase();  
    //console.log("11111111", notifyServicweId);  
    //console.log("22222222222222222", notifyCharacteristicsId);  
    console.log('that.data.connectedDeviceId' + that.data.connectedDeviceId);
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能  
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.data.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
      serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',// that.data.notifyServicweId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
      characteristicId: '0000ffe1-0000-1000-8000-00805f9b34fb',// that.data.notifyCharacteristicsId,
      success: function (res) {
        console.log('notifyBLECharacteristicValueChange success', res.errMsg)
      },
      fail: function () {
        console.log('shibai');
        console.log(that.data.notifyServicweId);
        console.log(that.data.notifyCharacteristicsId);
      },
    })
  },
  //接收消息  
  lanya10: function () {
    var that = this;
    // 必须在这里的回调才能获取  
    wx.onBLECharacteristicValueChange(function (characteristic) {

      let hex = Array.prototype.map.call(new Uint8Array(characteristic.value), x => ('00' + x.toString(16)).slice(-2)).join('');
      console.log(hex)
      console.log("===================== characteristic be here ===========================");
      console.log(characteristic);
    //   wx.request({
    //     url: '***/getDecrypt',
    //     data: { hexString: hex },
    //     method: "POST",
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     success: function (data) {
    //       //console.log(data)  
    //       var res = data.data.data;
    //       that.setData({
    //         jieshou: res,
    //       })
    //     }
    //   })
      that.setData({
        jieshou: characteristic,
      })
    })

    console.log(that.data.readServicweId);
    console.log(that.data.readCharacteristicsId);
    // wx.readBLECharacteristicValue({
    //   // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
    //   deviceId: that.data.connectedDeviceId,
    //   // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
    //   serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',// that.data.readServicweId,
    //   // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
    //   characteristicId: '0000ffe1-0000-1000-8000-00805f9b34fb',// that.data.readCharacteristicsId,
    //   success: function (res) {
    //     console.log('readBLECharacteristicValue:', res.errMsg);

    //   }
    // })
  }
})  