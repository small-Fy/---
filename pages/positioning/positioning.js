var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'LV4BZ-ZJPCP-MTXDM-L3Y2O-53EVZ-BPBDY'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // latitude: "",
    // longitude: "",
    // showFlag: false,
    // // 搜索结果
    // cityList: [],
    // markers: [],
    // polyline: [],
    // controls: []
  },
  getMap() {
    wx.chooseLocation({
      success: res => {
        wx.setStorageSync("positioning", res.name)
        wx.switchTab({
          url: '../../pages/index/index',
        })
      }
    })
  },
  // chooseCity(e) {
  //   this.setData({
  //     latitude: e.currentTarget.dataset.item.location.lat,
  //     longitude: e.currentTarget.dataset.item.location.lng,
  //     showFlag:false
  //   })
  // },
  // onChange(e) {
  //   qqmapsdk.search({
  //     keyword: e.detail.trim(), //搜索关键词
  //     location: '39.980014,116.313972', //设置周边搜索中心点
  //     success: res => { //搜索成功后的回调
  //       this.setData({
  //         showFlag: true,
  //         cityList: res.data
  //       })
  //       console.log(res, this.data.cityList)
  //     },
  //     fail: function(res) {
  //       console.log(res);
  //     },
  //     complete: function(res) {
  //       console.log(res);
  //     }
  //   });
  // },
  // regionChange(res){
  //   if (res.type == "end") {
  //     var thisBlock = this;
  //     this.mapCtx = wx.createMapContext("centerChange");
  //     this.mapCtx.getCenterLocation({
  //       success: function (res) {
  //         console.log(res);

  //         thisBlock.setData({
  //           latitude: res.latitude,
  //           longitude: res.longitude,

  //           markers: [{
  //             iconPath: "/images/map/address.png",
  //             id: 0,
  //             latitude: res.latitude,
  //             longitude: res.longitude,
  //             width: 35,
  //             height: 35,
  //             title: "当前位置",
  //             callout: {
  //               padding: 10,
  //               content: "当前位置",
  //               bgColor: "#DC143C",
  //               color: "#FFFF00",
  //               display: "ALWAYS"
  //             },
  //             label: { content: "标题" },
  //             anchor: {}
  //           }],
  //         })
  //       }
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   latitude: options.latitude,
    //   longitude: options.longitude
    // })
    // markers: [{
    //   iconPath: "/images/map/address.png",
    //   id: 0,
    //   latitude: options.latitude,
    //   longitude: options.longitude,
    //   width: 35,
    //   height: 35,
    //   title: "当前位置"
    // }]
    this.getMap()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})