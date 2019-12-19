const app = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类栏序号
    tabbarIndex:0,
    // 分类标志：人气推荐或者新品首发
    classifyFlag: "",
    // 商品数据
    goodsData:[],
    // 滚动数据距离顶部距离
    topNum:0,
    // 排序标志，默认desc
    sortFlag:false,
    // 排序方式
    order:"desc"
  },
  // 获取首页数据
  getData(flag,desc) {
    wx.showLoading({
      title: '加载中',
    })
    app.globalData.fly.get(`goods/goodsList?${flag}=1${desc}`).then(res => {
      if (res) {
        wx.hideLoading()
        this.setData({
          goodsData:res.data.data
        })
        console.log(res.data.data)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  // 选择分类栏
  chooseTab(e){
    this.setData({
      tabbarIndex: e.currentTarget.dataset.tabbarindex,
      topNum:0
    })
    if (this.data.tabbarIndex === 0 || this.data.tabbarIndex === 2){
      this.getData(this.data.classifyFlag)
    } else if (this.data.tabbarIndex === 1){
      this.getData(this.data.classifyFlag,"&order=desc")
    }
  },
  // 升序降序
  sort(e){
    if (this.data.order !== e.currentTarget.dataset.sort){
      this.setData({
        order: e.currentTarget.dataset.sort,
        sortFlag: !this.data.sortFlag
      })
      this.getData(this.data.classifyFlag, `&order=${this.data.order}`)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      classifyFlag: options.classifyFlag
    })
    this.getData(this.data.classifyFlag)
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