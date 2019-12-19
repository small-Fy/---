const app = new getApp()
import create from '../../utils/create'
import store from '../../store/index'
create.Page(store, {
  use: [],

  /**
   * 页面的初始数据
   */
  data: {
    // 分类列表
    categoryList: [],
    // 顶部导航栏索引号
    tabIndex: 0,
    // 分类栏数据
    currentNav:{},
    // 当前分类的数据
    currentOne: [],
    // 商品id
    classifyId:0
  },
  // 获取分类列表
  getClassifyList(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`category/categoryNav?id=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          categoryList: res.data.navData
        })
        this.getData(id)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取当前分类数据
  getData(id) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`goods/goodsList?categoryId=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          currentNav: res.data.currentNav,
          currentOne: res.data.data
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 选择具体分类
  chooseClassify(e) {
    this.setData({
      classifyId: this.data.categoryList[e.detail.name].id
    })
    this.getData(this.data.classifyId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      classifyId: options.classifyId,
      tabIndex: Number(options.tabIndex)
    })
    this.getClassifyList(this.data.classifyId)
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

  }
})