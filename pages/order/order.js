const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 购物车里的商品
    carList: [],
    // 总价
    allPrise: 0,
    openId: "",
    // 用户全部地址
    addressList: [],
    addressInfo: {}
  },
  getCarlist() {
    this.setData({
      carList: wx.getStorageSync("carList"),
      allPrise: wx.getStorageSync("allPrise")
    })
  },
  // 获取openId
  getOpenId() {
    this.setData({
      openId: wx.getStorageSync("openId")
    })
  },
  // 选择地址
  chooseAddress() {
    wx.navigateTo({
      url: '../../pages/addressList/addressList',
    })
  },
  // 点击支付
  pay() {
    this.data.carList.map(item => {
      this.deleteCar(item.id)
    })
  },
  // 删除购物车
  deleteCar(id) {
    app.globalData.fly.get(`/cart/deleteAction?id=${id}`).then(res => {
      if (res.data.data) {
        wx.setStorageSync("carList", [])
        wx.setStorageSync("allPrise", 0)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取用户地址
  getAddress() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/address/getListAction?openId=${this.data.openId}`).then(res => {
      console.log(res, 123)
      if (res) {
        res.data.data.map(item => {
          item.addressDetail = `${item.address}${item.address_detail}`
          if (item.is_default === 1) {
            this.setData({
              addressInfo: item
            })
          }
        })
        let aaa = res.data.data.every(item => {
          return item.is_default === 0
        })
        if (aaa) {
          this.setData({
            addressInfo: res.data.data[0]
          })
        }
        this.setData({
          addressList: res.data.data
        })
        wx.hideLoading()
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCarlist()
    this.getOpenId()
    this.getAddress()
    setTimeout(() => {
      if (options.addressInfo) {
        console.log(options.addressInfo)
        this.setData({
          addressInfo: JSON.parse(options.addressInfo)
        })
      }
    }, 1000)
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
    this.getCarlist()
    this.getOpenId()
    this.getAddress()
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