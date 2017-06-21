// detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatorPath: '/img/233.png',
    avatorNeedUpload: null,
    plateNumber: '',
    usrName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log('detailjs ------------');
    if (!app.globalData.userInfo || !app.globalData.userInfo.uid) {
      console.log('需要重新登陆------------------------------------');
      //remove localstorage

      wx.redirectTo({
        url: '/pages/me/login/login',
      })
    }
    console.log(app.globalData.userInfo);
    //data show
    wx.request({
      url: app.rootUrl + '/driver/' + app.globalData.userInfo.uid,
      success: function (dt) {
        console.log('---------------------------===-----------');
        console.log(dt);
        if (dt.data && dt.data.code == 0) {
          let usrObj = dt.data.payload;
          let avtUrl = usrObj.avatarUrl;
          if (!avtUrl) {
            avtUrl = app.globalData.userInfo.avatarUrl;
          }
          that.setData({
            usrName: usrObj.name,
            plateNumber: usrObj.plateNumber,
            avatorPath: avtUrl
          });
        } else {
          console.log('error================================')
        }
      }
    })
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
  changeAvator: function(e){
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res2) {
            //need filter large pic
            console.log(res2.width + '' + res2.height);
            console.log(res2.path)
            that.setData({
              avatorPath: res2.path,
              avatorNeedUpload: res.tempFilePaths[0]
            });
          }
        })
      }
    })
  },
  commitChange: function(e) {
    console.log("66666666666666666666666666")
    let that = this;
    //upload image or not
    if (that.data.avatorNeedUpload){
      wx.uploadFile({
        url: app.rootUrl + '/driver',
        filePath: that.data.avatorNeedUpload,
        name: 'mFile',
        formData: {
          'name': that.data.usrName,
          'phone': app.globalData.userInfo.phone,
          'plateNumber': that.data.plateNumber
        },
        success: function (res) {
          var data = res.data
          console.log(res);
          //get user new attrtbutes
          console.log(app.rootUrl + '/driver/' + app.globalData.userInfo.uid);
          wx.request({
            url: app.rootUrl + '/driver/' + app.globalData.userInfo.uid,
            success: function (dt) {
              console.log('---------------------------===-----------');
              console.log(dt);
              if (dt.data && dt.data.code == 0) {
                let usrObj = dt.data.payload;
                app.updateUser({
                  'name': usrObj.name,
                  'phone': usrObj.phone,
                  'avatarUrl': usrObj.avatarUrl,
                  'plateNumber': usrObj.plateNumber
                });
                wx.navigateBack({delta:1});

              }
            }
          })
          // app.updateUser({
          //   'name': that.data.usrName,
          //   'phone': app.globalData.userInfo.phone,
          //   'plateNumber': that.data.plateNumber
          // });
          //do something
        },
        fail: (e) => {
          console.log(e);
        }
      })
    }else{
      console.log(app.globalData.userInfo.phone)
      wx.request({
        url: app.rootUrl + '/driver',
        method: 'POST',
        // header: {
        //   'Content-Type': 'multipart/form-data; boundary=ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC'
        // },
        data:{
          'name': that.data.usrName,
          'phone': app.globalData.userInfo.phone,
          'plateNumber': that.data.plateNumber
        },
        success: function(dt){
          console.log(dt);
          if (dt.data && dt.data.code == 0) {
            let usrObj = dt.data.payload;
            app.updateUser({
              'name': that.data.usrName,
              'phone': app.globalData.userInfo.phone,
              // 'avatarUrl': usrObj.avatarUrl,
              'plateNumber': that.data.plateNumber
            });
            wx.navigateBack({ delta: 1 });
          }
        }

      })
    }


  },
  changePltNb: function(e) {
    let that = this;
    that.setData({
      plateNumber: e.detail.value
    })
  },
  changeUsrNm: function(e) {
    let that = this;
    that.setData({
      usrName: e.detail.value
    })
  }
})