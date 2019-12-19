const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 搜索内容显示标志
    searchFlag: false,
    // 搜索关键词
    keyword: "",
    // 商品列表
    goodsList: [],
    // 用户的openId
    openId: "",
    // 默认搜索词
    defaultKeyword: "",
    // 搜索历史
    historyData: [],
    // 热搜
    hotKeywordList: []
  },
  // 清除搜索历史
  clearHistory(){
    app.globalData.fly.post(`/search/clearhistoryAction`, { openId: this.data.openId}).then(res => {
      this.getSearchList()
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
  onCancel() {
    this.setData({
      keyword: ""
    })
  },
  // 搜索
  onSearch(e) {
    if (e.detail.trim() !== "") {
      this.setData({
        searchFlag: true
      })
      this.search(e.detail.trim())
    } else {
      this.setData({
        searchFlag: false
      })
      this.search(this.data.defaultKeyword)
    }
  },
  // 搜索
  search(keyword) {
    app.globalData.fly.get(`/search/helperaction?keyword=${keyword}`).then(res => {
      if (res) {
        this.setData({
          goodsList: res.data.keywords
        })
        this.getSearchList()
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取搜索历史
  getSearchList() {
    app.globalData.fly.get(`/search/indexaction?openId=${this.data.openId}`).then(res => {
      if (res) {
        this.setData({
          defaultKeyword: res.data.defaultKeyword.keyword,
          historyData: res.data.historyData,
          hotKeywordList: res.data.hotKeywordList
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 添加搜索
  addhistoryaction(keyword) {
    let aaa = {}
    aaa.keyword = keyword
    aaa.openId = this.data.openId
    app.globalData.fly.post(`/search/addhistoryaction`, aaa).then(res => {
      this.search(this.data.keyword)
    }).catch(err => {
      console.log(err)
    })
  },
  // 点击热门搜索
  clickHot(e) {
    this.setData({
      keyword: e.currentTarget.dataset.keyword,
      searchFlag: true
    })
    this.addhistoryaction(this.data.keyword)
  },
  // 点击搜索历史
  clickHistory(e) {
    this.setData({
      keyword: e.currentTarget.dataset.keyword,
      searchFlag: true
    })
    this.addhistoryaction(this.data.keyword)
  },
  // 确定搜索
  toSearch(e) {
    let keyword = e.detail.trim()
    if (keyword !== "") {
      this.setData({
        searchFlag: true
      })
      this.addhistoryaction(keyword)
    } else {
      this.addhistoryaction(keyword)
    }
  },
  // 点击搜索出来的商品
  clickGoods(e){
    wx.navigateTo({
      url: `/pages/goodsDetail/goodsDetail?goodsId=${e.currentTarget.dataset.item.id}`,
    })
  },
  // 点击取消
  onCancel(){
    setTimeout(() => {
      this.setData({
        searchFlag: false
      })
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOpenId()
    this.getSearchList()
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