const app = new getApp()
let WxParse = require('../../lib/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户的openId
    openId: "",
    // 商品id
    goodsId: "",
    // 商品信息
    goodsInfo: {},
    // 是否收藏
    collectionFlag: false,
    // 商品规格信息显示标志
    goodsGg: false,
    // 加入到购物车的数量
    carNum: 0,
    // 商品最大数量
    maxNum: 0,
    // 购物车里的商品
    carList: [],
    // 总价
    allPrise: 0
  },
  // 跳转到购物车
  toCar(){
    wx.switchTab({
      url: '../../pages/shoppingCart/shoppingCart',
    })
  },
  // 立即购买
  clickBuy() {
    let goodsInfo={}
    goodsInfo.goods_name = this.data.goodsInfo.info.name
    goodsInfo.retail_price = this.data.goodsInfo.info.retail_price
    goodsInfo.number = this.data.carNum
    goodsInfo.list_pic_url = this.data.goodsInfo.info.list_pic_url
    this.data.carList.push(goodsInfo)
    this.setData({
      carList: this.data.carList,
      allPrise: this.data.goodsInfo.info.retail_price*this.data.carNum
    })
    wx.setStorageSync("carList", this.data.carList)
    wx.setStorageSync("allPrise", this.data.allPrise)
    wx.navigateTo({
      url: '../../pages/order/order',
    })
  },
  // 获取商品数据
  getdGoodsInfo(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/goods/detailaction?id=${id}&openId=${this.data.openId}`).then(res => {
      if (res) {
        this.setData({
          goodsInfo: res.data,
          collectionFlag: res.data.collected,
          maxNum: res.data.info.goods_number
        })
        WxParse.wxParse('article', 'md', res.data.info.goods_desc, this, 5)
        this.watchCar()
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 查看购物车
  watchCar() {
    app.globalData.fly.get(`/cart/cartList?openId=${this.data.openId}`).then(res => {
      if (res) {
        res.data.data.map(item => {
          if (item.goods_id === Number(this.data.goodsId)) {
            this.setData({
              carNum: item.number
            })
          }
        })
        wx.hideLoading()
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
  // 加入收藏
  adddCollection() {
    let goods = {}
    goods.goodsId = this.data.goodsId
    goods.openId = this.data.openId
    app.globalData.fly.post(`/collect/addcollect`, goods).then(res => {
      if (res.data.data === "success") {
        this.setData({
          collectionFlag: !this.data.collectionFlag
        })
        if (this.data.collectionFlag) {
          wx.showToast({
            title: '加入收藏成功',
          })
        } else {
          wx.showToast({
            title: '取消收藏成功',
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击加入购物车
  clickAdd() {
    this.setData({
      goodsGg: true
    })
  },
  // 关闭商品规格
  closeGoods() {
    this.setData({
      goodsGg: false
    })
  },
  // 关闭商品规格
  onClose() {
    this.setData({
      goodsGg: false
    })
  },
  // 加入购物车
  addCart(e) {
    this.setData({
      carNum: e.detail
    })
  },
  // 确定添加到购物车
  sureAdd() {
    let goods = {}
    goods.goodsId = this.data.goodsId
    goods.number = this.data.carNum
    goods.openId = this.data.openId
    app.globalData.fly.post(`/cart/addCart`, goods).then(res => {
      if (res.data.data === "success") {
        wx.showToast({
          title: '加入购物车成功',
        })
        this.setData({
          goodsGg: false
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goodsId: options.goodsId
    })
    this.getOpenId()
    this.getdGoodsInfo(this.data.goodsId)
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