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
    categoryList:[],
    // 侧边导航栏索引号
    activeKey:0,
    // 当前分类的数据
    currentOne:{}
  },
  // 获取分类列表
  getClassifyList() {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get("category/indexaction").then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          categoryList: res.data.categoryList
        })
        this.getData(this.data.categoryList[0].id)
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
    app.globalData.fly.get(`category/currentaction?id=${id}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          currentOne: res.data.data.currentOne
        })
        console.log(this.data.currentOne,666)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 选择具体分类
  chooseClassify(e){
    this.getData(this.data.categoryList[e.detail].id)
  },
  // 跳转到分类页面
  toNewCategory(e){
    wx.navigateTo({
      url: `/pages/newCategory/newCategory?classifyId=${this.data.currentOne.subList[e.currentTarget.dataset.index].id}&tabIndex=${e.currentTarget.dataset.index}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassifyList()
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