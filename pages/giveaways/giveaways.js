// pages/giveaways/giveaways.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this;
    const {header} = app.globalData;
    console.log(app.globalData.baseUrl)
    wx.request({
      url: `${app.globalData.baseUrl}/items`,
      method: 'GET',
      header: header,
      success (res) {
        // console.log('giveaways',res.data.user_items)
        page.setData({
          user: res.data.user,
          giveaways: res.data.user_items
        })
        console.log('giveaways', page.data.giveaways)
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

  }
})