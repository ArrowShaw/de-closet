// pages/giveaways/share.js
const app = getApp()
Page({
 
  data: {
    showLoading: false
  },

  onLoad: function (options) {
    console.log('in share onLoad')
    this.setData({showLoading: true})
    if (app.globalData.header) {
      this.getGiveaways();
    } else {
      console.log('wait for user header')
      wx.event.on('headersReady', this, this.getGiveaways)
    }
  },

  getGiveaways() {
    console.log('in getGiveaways')
    const user_id = this.options.user_id
    const page = this
    wx.request({
      url: `${app.globalData.baseUrl}/items?req_type=giveaways&user_id=${user_id}`,
      header: app.globalData.header,
      success(res) {
        console.log('share res', res)
        page.setData({
          giveaways: res.data.items,
          user: res.data.user,
          showLoading: false
        })
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