const app = new getApp()
import create from '../../utils/create'
import store from '../../store/index'
create.Page(store, {
  use: [],

  /**
   * 页面的初始数据
   */
  data: {
    // 当前页码
    page:1,
    // 主题
    topics:[]
  },
  // 获取首页数据
  getTopic(page) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`topic/listaction?page=${page}`).then(res => {
      if (res) {
        wx.hideLoading()
        if(res.data.total>=this.data.page){
          this.setData({
            topics: this.data.topics.concat(res.data.data)
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopic(1)
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
    this.setData({
      page:this.data.page+1
    })
    this.getTopic(this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})