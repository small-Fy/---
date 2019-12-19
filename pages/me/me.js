// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: null,
    // 用户操作列表
    operationList: [{
        name: "我的订单",
        path: "../../images/order.png"
      },
      {
        name: "优惠券",
        path: "../../images/coupons.png"
      },
      {
        name: "礼品卡",
        path: "../../images/giftCard.png"
      },
      {
        name: "我的收藏",
        path: "../../images/collection.png",
        url:"../../pages/collection/collection"
      },
      {
        name: "我的足迹",
        path: "../../images/footprint.png"
      },
      {
        name: "会员福利",
        path: "../../images/membershipBenefits.png"
      },
      {
        name: "地址管理",
        path: "../../images/address_me.png",
        url: "../../pages/addressList/addressList"
      },
      {
        name: "账号安全",
        path: "../../images/accountSecurity.png"
      },
      {
        name: "联系客服",
        path: "../../images/detail_kefu.png"
      },
      {
        name: "帮助中心",
        path: "../../images/helpCenter.png"
      },
      {
        name: "意见反馈",
        path: "../../images/feedback.png",
        url: "../../pages/opinion/opinion"
      }
    ]
  },
  // 跳转到详情页面
  jump(e){
    if (this.data.userInfo){
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    }else{
      wx.showToast({
        title: '你还没有登录哦',
      })
    }
  },
  // 获取用户授权
  onGotUserInfo(e) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.setData({
                userInfo: res.userInfo
              })
              wx.setStorageSync("userInfo", this.data.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.showModal({
            title: "特别提醒",
            content: "您已拒绝授权登录，可能无法正常使用该程序，请再次点击登录",
            showCancel: false,
            confirmText: "确定",
            confirmColor: "#0f0",
            success: res => {}
          })
        }
      }
    })
  },
  // 获取用户信息
  getUserInfo(){
    if (wx.getStorageSync("userInfo")){
      this.setData({
        userInfo: wx.getStorageSync("userInfo")
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserInfo()
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
    this.getUserInfo()
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