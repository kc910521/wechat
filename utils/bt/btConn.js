
import * as but from './btUtils';

var app = getApp();

export default class btConn {

  constructor() {
    this.discovering;
    this.available;
    this.devices;
    this.connectedDeviceId;
    this.realCode;//passwd
  }

  get vDevices(){
    return this.devices;
  }
  get vConnectedDeviceId() {
    return this.connectedDeviceId;
  }

/**********************func***************************************/
  onStateListerner() {
    //监听蓝牙适配器状态  
    wx.onBluetoothAdapterStateChange((res) => {
      this.discovering = res.discovering;
      this.available = res.available;
    })
  }
  createConn(){
    let that = this;
    wx.openBluetoothAdapter({
      success: (res) => {
        wx.showToast({ duration: 4000 ,title: "初始化蓝牙适配器成功！" + JSON.stringify(res)});
        that.onStateListerner();
      },
      fail: () => {
        wx.showToast({ duration: 4500, title: '初始化蓝牙适配器失败，请打开蓝牙后重试'});
        that.available = false;
      }
    })
  };

  status(){
    let that = this;
    wx.getBluetoothAdapterState({
      success: (res) => {
        that.discovering = res.discovering;
        that.available = res.available;
        console.log("本机蓝牙适配器状态" + "/" + JSON.stringify(res.errMsg));
        that.onStateListerner();
      }
    })
  }
  search(){
    let that = this;
    this.stopSearch();
    wx.startBluetoothDevicesDiscovery({
      //services: ['0000ffe0-0000-1000-8000-00805f9b34fb'],
      success: (res) => {
        console.log("搜索设备" + JSON.stringify(res));
        //监听蓝牙适配器状态
        that.onStateListerner();
      }
    })
  }
  onNotify(callback){
    let that = this;
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能  
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
      serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',// that.data.notifyServicweId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
      characteristicId: '0000ffe1-0000-1000-8000-00805f9b34fb',// that.data.notifyCharacteristicsId,
      success: function (res) {
        console.log('notifyBLECharacteristicValueChange success', res.errMsg)
      },
      fail: function () {
        console.log('notifyBLECharacteristicValueChange fail');
      },
    })
  }
  listDevices(succCallback){
    console.log(" + JSON.stringify(res.devices)");
    let that = this;
    wx.getBluetoothDevices({
      success: (res) => {
        that.devices = res;
        if (succCallback) {
          succCallback(res);
        }
        console.log("已连接" + JSON.stringify(res.devices));
        //是否有已连接设备  
        wx.getConnectedBluetoothDevices({
          success: function (res2) {
            that.connectedDeviceId = res2.deviceId;
          }
        })
      },
      fail: () =>{
        console.log(" list fail");
      }
    })
  }
  stopSearch(){
    let that = this;
    wx.stopBluetoothDevicesDiscovery({
      success: function (res) {
        console.log("停止搜索周边设备" + "/" + JSON.stringify(res.errMsg));
        that.discovering = res.discovering;
        that.available = res.available;
      }
    })
  }
  connTo(did,succCb,failCb){
    let that = this;
    that.realCode = null;
    wx.createBLEConnection({
      deviceId: did,
      success: function (res) {
        console.log("连接成功" + did);
        that.connectedDeviceId = did;
        succCb();
      },
      fail: function () {
        console.log("连接失败");
        failCb();
      }
    })
  };
  disConnTo(did){
    let that = this;
    wx.closeBLEConnection({
      deviceId: did,
      success: function (res) {
        that.connectedDeviceId = null;
      }
    })
  };
  unlock(){

  };
  sendOperCode(operCode,succCb,failCb){
    var that = this;
    console.log('passwd' + that.realCode);
    if (that.realCode) {
      let hstr = that.realCode;
      let openCode = '40' + hstr + operCode;
      //加密
      let ededCode = hexToCode(openCode);
      console.log('ededCode:' + ededCode);
      let crccode = crcTableSimple(Str2Bytes(ededCode));
      console.log('crccode:' + crccode);


      let oarray = Str2Bytes(ededCode + '' + crccode);
      let buffer = new ArrayBuffer(18)
      let dataView = new DataView(buffer)
      for (var i = 0; i < oarray.length; i++) {
        dataView.setInt8(i, oarray[i]);
      }
      wx.writeBLECharacteristicValue({
        // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
        deviceId: that.data.connectedDeviceId,
        // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
        serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',// that.data.writeServicweId,
        // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
        characteristicId: '0000ffe1-0000-1000-8000-00805f9b34fb',// that.data.writeCharacteristicsId,
        // 这里的value是ArrayBuffer类型  
        value: buffer,
        fail: function(){
          failCb();
        },
        success: function (res) {
          that.setData({
            jieshou: JSON.stringify(res)
          })
          console.log('writeBLECharacteristicValue success ', res.errMsg)
          succCb();
        }
      })
    }
  };

  /**
   * 登陆蓝牙地锁用
   */
  //B434085CA1BF65E536A0DE80D7877D729FB2
  sendCode(orgHex, succCb, failCb){
    let that = this;
    wx.onBLECharacteristicValueChange(function (characteristic) {
      console.log("===================== characteristic be here ===========================");
      let hex = Array.prototype.map.call(new Uint8Array(characteristic.value), x => ('00' + x.toString(16)).slice(-2)).join('');//00
      let orgcode = but.codeToStr(hex);
      console.log("---------hex-----------");
      console.log(hex + '');
      console.log(orgcode);
      console.log(characteristic);
      console.log("-----------hex");
      //发送开锁 passwd
      if (true) {
        //has code...
        let realCode = orgcode.substring(2, orgcode.length - 12);
        console.log('realCode:' + realCode);
        that.realCode = realCode;
      }
    })
    let oarray = but.Str2Bytes('B434085CA1BF65E536A0DE80D7877D729FB2');
    console.log('oarray' + that.connectedDeviceId);
    console.log(oarray);
    let buffer = new ArrayBuffer(18)
    let dataView = new DataView(buffer)
    for (var i = 0; i < oarray.length; i++) {
      dataView.setInt8(i, oarray[i]);
    }

    wx.writeBLECharacteristicValue({
      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取  
      deviceId: that.connectedDeviceId,
      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取  
      serviceId: '0000ffe0-0000-1000-8000-00805f9b34fb',// that.data.writeServicweId,
      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取  
      characteristicId: '0000ffe1-0000-1000-8000-00805f9b34fb',// that.data.writeCharacteristicsId,
      // 这里的value是ArrayBuffer类型  
      value: buffer,
      success: function(res){
        console.log(res);
        succCb();
      },
      fail: function(){
        console.log('writeBLECharacteristicValue fail');
        failCb();
      }
    })
  }




}
