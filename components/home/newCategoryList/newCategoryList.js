// components/home/newCategoryList/newCategoryList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newCategoryList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转分类详情
    chooseClassify(e) {
      wx.navigateTo({
        url: `/pages/newCategory/newCategory?classifyId=${this.properties.newCategoryList[e.currentTarget.dataset.index].id}&tabIndex=${e.currentTarget.dataset.index}`,
      })
    },
    // 查看商品详情
    toDetail(e) {
      wx.navigateTo({
        url: `/pages/goodsDetail/goodsDetail?goodsId=${e.currentTarget.dataset.goodsid}`,
      })
    }
  }
})