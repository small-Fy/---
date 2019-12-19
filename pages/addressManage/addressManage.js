import areaList from "../../lib/area.js"
const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaList: {},
    openId: "",
    // 默认地址标志
    checked: false,
    // 姓名
    userName: "",
    // 电话号码
    telNumber: '',
    // 地址：省市区
    address: "",
    // 详细地址
    detailadress: "",
    // 城市选择列表
    showCity: false,
    addressId: 0
  },
  // 设置默认地址
  setDefault() {
    this.setData({
      checked: !this.data.checked
    })
  },
  inputName(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  inputPhone(e) {
    this.setData({
      telNumber: e.detail.value
    })
  },
  inputAddress(e) {
    this.setData({
      showCity: true
    })
  },
  inputDetail(e) {
    this.setData({
      detailadress: e.detail.value
    })
  },
  // 选择城市
  confirmCity(e) {
    this.setData({
      showCity: false,
      address: `${e.detail.values[0].name}${e.detail.values[1].name}${e.detail.values[2].name}`
    })
  },
  cancelCity() {
    this.setData({
      showCity: false
    })
  },
  onClose() {
    this.setData({
      showCity: false
    })
  },
  // 新增或编辑地址
  addAddress() {
    let aaa = {}
    aaa.address = this.data.address
    aaa.openId = this.data.openId
    aaa.checked = this.data.checked
    aaa.detailadress = this.data.detailadress
    aaa.telNumber = this.data.telNumber
    aaa.userName = this.data.userName
    aaa.addressId = this.data.addressId ? this.data.addressId : undefined
    app.globalData.fly.post(`/address/saveAction`, aaa).then(res => {
      if (res.data.data) {
        wx.showToast({
          title: '成功',
        })
        wx.navigateTo({
          url: '../../pages/addressList/addressList',
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取openId
  getOpenId() {
    this.setData({
      openId: wx.getStorageSync("openId")
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.addressInfo) {
      this.setData({
        areaList: areaList,
        addressId: JSON.parse(options.addressInfo).id,
        userName: JSON.parse(options.addressInfo).name,
        telNumber: JSON.parse(options.addressInfo).mobile,
        address: JSON.parse(options.addressInfo).address,
        detailadress: JSON.parse(options.addressInfo).address_detail,
        checked: JSON.parse(options.addressInfo).is_default === 1 ? true : false
      })
    }else{
      this.setData({
        areaList: areaList,
      })
    }

    this.getOpenId()
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