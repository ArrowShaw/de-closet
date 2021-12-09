// pages/closet/closet.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    tags: ['All']

  },

onClick: function() {
    wx.redirectTo({
      url: '/pages/goal/goal',
    })
  },

  onClickTag: function() {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this
    const {header} = getApp().globalData
    console.log('hey', {header})
    wx.request({
      url: `${app.globalData.baseUrl}/items?req_type=my_closet`,
      method: 'GET',
      header: header,
      success (res) {
        console.log('data from backend', res.data)
        // page.setData({
        //   categories: res.data
        // })
        page.setData({
          user: res.data.user,
          categories: res.data.user_items,
          targetNum: res.data.user.max_number,
          currentNum: res.data.number_of_items
        })
        console.log(page.data)
        console.log(res.data.number_of_items)
        // [ {category: "tops", items: [{},{}]}, {category: "bottoms", items: [{},{}] } ]
        // this.setData({ items: res.data })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    return {
      title: 'DeCloset - delutter your closet, save your favourite items only 💗',
      imageUrl: '/images/head.jpeg',
      path: '/pages/index/index'
    }
  }
})