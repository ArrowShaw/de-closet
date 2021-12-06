// pages/closet/closet.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    tags: [
      {
        name: 'My closet',
        num: 0,
        selected: true,
      },
      // {
      //   name: 'Giveaways',
      //   num: 0,
      //   selected: false,
      // }
    ]

  },

onClick: function() {
    
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this
    const {header} = getApp().globalData
    console.log({header})
    wx.request({
      url: 'http://localhost:3000/api/v1/items',
      // url: 'https://de-closet-backend.wogengapp.cn/api/v1/items', // real url address
      method: 'GET',
      header: header,
      success (res) {
        console.log('data from backend', res.data)
        // make sure that res.data is an array that comes that way from the backend
        page.setData({
          categories: res.data
        })
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

  }
})