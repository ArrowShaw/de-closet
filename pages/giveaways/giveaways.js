// pages/giveaways/giveaways.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    selected: [],
    checked: false,
    status: ['free', 'booked', 'gone'],
    index: 0,
    itemName: 'item'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('options',{options})
    this.setData({
      currentUser: app.globalData.user
    })
    // /pages/giveaways/giveaways
    // options: {}
    // /pages/giveaways/giveaways?user_id=1
    // { user_id: 1 }
    const path = options.user_id ? `/items?req_type=giveaways&user_id=${options.user_id}` :  `/items?req_type=giveaways`

    const page = this;
    const {header} = app.globalData;
    // console.log(app.globalData.baseUrl)
    // console.log(path)
    wx.request({
      url: `${app.globalData.baseUrl}${path}`,
      method: 'GET',
      header: header,
      // data: { req_type: 'giveaways'},
      success (res) {
        console.log('giveaways',res.data)
        page.setData({
          giveaways: res.data
        })
        if(page.data.giveaways.items.length > 1){
          page.setData({
            itemName: 'items'
          })
        }
        // const giveaways = res.data.map((item) => {
        //   return { ...item, checked: false, status: 'available' }
      }

        // page.setData({ giveaways })
        // console.log('giveaways', page.data.giveaways)
    })
  },

  onClick: function(e) {
    const page = this;
    console.log('value from form', e.detail.value)
    var { header } = getApp().globalData
    var selected = e.detail.value.selected;
    console.log('selected', selected)
    wx.getUserProfile({
      desc: 'for completing user file', // declaire how the info is used
      success: (res) => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
    wx.request({
      url: `${app.globalData.baseUrl}/giveaways`,
      method: 'POST',
      header: header,
      data: { selected: selected, userInfo: userInfo },
      success (res) {
        console.log(res.data)
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
   * Called {} when user click on the top right corner to share
   */
  onShareAppMessage: function (options) {
    console.log('options in share app message', options)

    if (options.target && options.target.dataset.user_id) {
      return {
        title: 'Check out my giveaways! 👀',
        imageUrl: '/images/head.jpeg',
        path: `/pages/giveaways/giveaways?user_id=${options.target.dataset.user_id}`
      }
    } else {
      return {
        title: 'DeCloset - delutter your closet, save your favourite items only 💗',
        imageUrl: '/images/head.jpeg',
        path: '/pages/index/index'
      }
    }
  }
})