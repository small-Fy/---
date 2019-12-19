const app = new getApp()
import create from '../../utils/create'
import store from '../../store/index'
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'LV4BZ-ZJPCP-MTXDM-L3Y2O-53EVZ-BPBDY'
});
create.Page(store, {
  use: [],
  /**
   * 页面的初始数据
   */
  data: {
    // 是否定位标志
    positionFlag: false,
    // 定位位置
    positioning: "",
    // 搜索关键词
    keyword: "",
    // banner图
    banners: [],
    // 供销商列表
    brandList: [],
    // 分类
    channel: [],
    // 热门商品
    hotGoods: [],
    // 新商品分类
    newCategoryList: [],
    // 新品首发
    newGoods: [],
    // 主题列表
    topicList: [],
    latitude: "",
    longitude: ""
  },
  // 搜索显示
  toSearch() {
    wx.navigateTo({
      url: '../../pages/searchInner/searchInner',
    })
  },
  // 跳转到选择页面
  toPosition(){
    wx.navigateTo({
      url: `../../pages/positioning/positioning?latitude=${this.data.latitude}&longitude=${this.data.longitude}`,
    })
  },
  // 获取首页数据
  getHomeData() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("/index/index").then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          banners: res.data.banner,
          brandList: res.data.brandList,
          channel: res.data.channel,
          hotGoods: res.data.hotGoods,
          newCategoryList: res.data.newCategoryList,
          newGoods: res.data.newGoods,
          topicList: res.data.topicList
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 跳转人气推荐
  toSentiment(e) {
    wx.navigateTo({
      url: `/pages/sentiment/sentiment?classifyFlag=${e.currentTarget.dataset.classifyflag}`,
    })
  },
  location() {
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: res => {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: addressRes => {
            this.setData({
              latitude: addressRes.result.location.lat,
              longitude: addressRes.result.location.lng,
              positionFlag: true,
              positioning: addressRes.result.address_component.street
            })
          }
        })
      },
      fail: res1 => {
        this.warnBox()
      }
    })
  },
  // 跳转到定位页面
  warnBox() {
    wx.showModal({
      title: '特别提醒',
      content: '如不开启授权，则无法使用该程序',
      success: res => {
        if (res.confirm) {
          wx.openSetting({
            success: res1 => {
              if (!res1.authSetting['scope.userLocation']) {
                this.warnBox()
              } else {
                wx.getLocation({
                  type: 'gcj02',
                  isHighAccuracy: true,
                  success: res3 => {
                    qqmapsdk.reverseGeocoder({
                      location: {
                        latitude: res3.latitude,
                        longitude: res3.longitude
                      },
                      success: addressRes => {
                        this.setData({
                          positionFlag: true,
                          positioning: addressRes.result.address_component.street
                        })
                      }
                    })
                  }
                })
              }
            }
          })
        } else {
          this.warnBox()
        }
      }
    })
  },
  getPosition(){
    if (wx.getStorageSync("positioning")){
      this.setData({
        positioning: wx.getStorageSync("positioning")
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.location()
    this.getHomeData()
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
    this.getPosition()
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