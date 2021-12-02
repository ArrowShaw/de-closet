// pages/goal/goal.js
Page({

  /**
   * Page initial data
   */
  data: {

  },
  bindViewTap(e) {
    console.log(e)
    const data = {
      user: {
        max_number: e.detail.value.max_number
      }
    }
    var header = getApp().globalData.header;
    wx.request({
      url: 'http://localhost:3000/api/v1/users/update', // real url address
      header: header,
      data: data,
      method:'PUT',
      success (res) {
      // if successful
        console.log('INSIDE GOAL.JS', res.data)
        wx.navigateTo({
          url: '/pages/upload/upload'
        })
      },
      fail(rej){
      // if fail
        console.log(rej.data)
      }
    })
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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