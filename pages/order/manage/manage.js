// manage.js
var Api = require('../../../utils/api.js');
var util = require('../../../utils/util.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    // navList: navList,
    title: '话题列表',
    postsList: [],
    hidden: false,
    page: 1,
    limit: 20,
    tab: 'all'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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
    this.getData();
    console.log('下拉刷新', new Date());
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.lower();
    console.log('上拉刷新', new Date());
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
    //获取文章列表数据
  getData: function () {
    var that = this;
    // var tab = that.data.tab;
    var page = that.data.page;
    var limit = that.data.limit;
    var ApiUrl = Api.topics + '?tab=all&page=' + page + '&limit=' + limit;

    that.setData({ hidden: false });

    if (page == 1) {
      that.setData({ postsList: [] });
    }

    Api.fetchGet(ApiUrl, (err, res) => {
      //更新数据
      that.setData({
        postsList: that.data.postsList.concat(res.data.map(function (item) {
          item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
          return item;
        }))
      });

      setTimeout(function () {
        that.setData({ hidden: true });
      }, 300);
    })
  },
  // 滑动底部加载
  lower: function () {
    console.log('滑动底部加载', new Date());
    var that = this;
    that.setData({
      page: that.data.page + 1
    });
    this.getData({ page: that.data.page });
    // if (that.data.tab !== 'all') {
    //   this.getData({ tab: that.data.tab, page: that.data.page });
    // } else {
    //   this.getData({ page: that.data.page });
    // }
  }

})