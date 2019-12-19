const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: "",
    // 用户全部地址
    addressList: []
  },
  // 选中地址
  chooseAddress(e){
    wx.navigateTo({
      url: `../../pages/order/order?addressInfo=${JSON.stringify(e.currentTarget.dataset.item)}`,
    })
  },
  // 添加地址
  addAddress() {
    wx.navigateTo({
      url: '../../pages/addressManage/addressManage',
    })
  },
  // 获取openId
  getOpenId() {
    this.setData({
      openId: wx.getStorageSync("openId")
    })
  },
  // 获取用户地址
  getAddress() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/address/getListAction?openId=${this.data.openId}`).then(res => {
      if (res) {
        res.data.data.map(item => {
          item.addressDetail = `${item.address}${item.address_detail}`
        })
        this.setData({
          addressList: res.data.data
        })
        wx.hideLoading()
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 编辑地址
  editAddress(e) {
    wx.navigateTo({
      url: `../../pages/addressManage/addressManage?addressInfo=${JSON.stringify(e.currentTarget.dataset.item)}`,
    })
  },
  // 删除地址
  deleteAddress(e) {
    wx.showModal({
      title: '确定删除？',
      success: res => {
        if (res.confirm) {
          app.globalData.fly.get(`/address/deleteAction?id=${e.currentTarget.dataset.item.id}`).then(res => {
            if (res.data.data) {
              wx.showToast({
                title: '删除成功',
              })
              this.getAddress()
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOpenId()
    this.getAddress()
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