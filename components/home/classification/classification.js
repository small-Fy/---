// components/home/classification/classification.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    channel:{
      type:Array
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
    chooseClassify(e){
      let tabIndex=0
      if (e.currentTarget.dataset.index===0){
        tabIndex=0
      } else if (e.currentTarget.dataset.index === 1){
        tabIndex = 1
      } else if (e.currentTarget.dataset.index === 2){
        tabIndex = 4
      } else if (e.currentTarget.dataset.index === 3) {
        tabIndex = 3
      }else{
        tabIndex = 8
      }
      wx.navigateTo({
        url: `/pages/newCategory/newCategory?classifyId=${this.properties.channel[e.currentTarget.dataset.index].id}&tabIndex=${tabIndex}`,
      })
    }
  }
})
