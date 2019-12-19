const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户的openId
    openId: "",
    // 购物车的数据
    goodsList: [],
    // 全选
    checkAll: false,
    // 总价
    allPrise: 0,
    // 加入到购物车的商品id
    goodsIdList: [],
    // 购物车里的商品
    carList:[]
  },
  // 获取openId
  getOpenId() {
    this.setData({
      openId: wx.getStorageSync("openId")
    })
  },
  // 单选
  checkOne(e) {
    this.data.goodsList.map(item => {
      if (item.id === e.currentTarget.dataset.item.id) {
        item.checked = !item.checked
        if (item.checked) {
          this.setData({
            goodsList: this.data.goodsList,
            allPrise: this.data.allPrise + item.number * item.retail_price * 100
          })
        } else {
          this.setData({
            goodsList: this.data.goodsList,
            allPrise: this.data.allPrise - item.number * item.retail_price * 100
          })
        }
      }
    })
    let aaa = this.data.goodsList.every(item => {
      return item.checked === true
    })
    if (aaa) {
      this.data.goodsList.map(item => {
        item.checked = true
      })
      this.setData({
        checkAll: true
      })
    } else {
      this.setData({
        checkAll: false
      })
    }
    this.setData({
      goodsList: this.data.goodsList
    })
  },
  // 全选
  chooseAll() {
    let allPrise = 0
    this.setData({
      checkAll: !this.data.checkAll
    })
    this.data.goodsList.map(item => {
      item.checked = this.data.checkAll
      if (item.checked) {
        allPrise += item.number * item.retail_price
        this.data.goodsIdList.push(item.goods_id)
      }
    })
    if (!this.data.checkAll) {
      this.setData({
        goodsIdList: [],
        goodsList: this.data.goodsList,
        allPrise: allPrise * 100
      })
    } else {
      this.setData({
        goodsIdList: this.data.goodsIdList,
        goodsList: this.data.goodsList,
        allPrise: allPrise * 100
      })
    }
  },
  // 查看购物车
  watchCar() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`/cart/cartList?openId=${this.data.openId}`).then(res => {
      if (res) {
        wx.hideLoading()
        res.data.data.map(item => {
          item.checked = false
        })
        this.setData({
          goodsList: res.data.data
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 删除购物车
  deleteCar(e) {
    wx.showModal({
      title: '确认删除',
      success: res => {
        if (res.confirm) {
          app.globalData.fly.get(`/cart/deleteAction?id=${e.currentTarget.dataset.item.id}`).then(res => {
            if (res.data.data) {
              this.watchCar()
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    })
  },
  // 提交订单
  submitOrder(){
    this.data.goodsList.map(item=>{
      if(item.checked){
        this.data.carList.push(item)
      }
    })
    this.setData({
      carList: this.data.carList
    })
    wx.setStorageSync("carList", this.data.carList)
    wx.setStorageSync("allPrise", this.data.allPrise/100)
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOpenId()
    this.watchCar()
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
    this.watchCar()
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