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
    itemName: 'item',
    like: "like.png",
    likes: 0
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
          giveaways: res.data.items,
          currentNum: res.data.number_of_items,
          targetNum: res.data.user.max_number,
          user: res.data.user
        })
        if(page.data.giveaways.length > 1){
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

  onClick: function(e){
    let page = this;
    console.log("e data", e)
    const { header } = app.globalData;
    const item_id = e.currentTarget.dataset.id;
    wx.getUserProfile({
      desc: 'for completing user file', // declare how the info is used
      success: (res) => {
        page.setData({
          userInfo: res.userInfo
        })
        wx.request({
          url: `${app.globalData.baseUrl}/giveaways`,
          method: 'POST',
          header: header,
          data: {
            item_id: item_id,
            userInfo: page.data.userInfo
          },
          success (res) {
            console.log(res.data)
            wx.request({
              url: `${app.globalData.baseUrl}/giveaways`,
              header: header,
              data: { item_id: item_id },
              method: 'GET',
              success (res) {
                console.log('res in giveaway GET', res.data)
                page.setData({
                  likes: res.data.num
                })
                if(page.data.likes > 0){
                  page.setData({
                    like: "liked.png"
                  })
                }
                console.log('data from giveaway index', page.data)
              }
            })
          }
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
   * Called {} when user click on the top right corner to share
   */
  onShareAppMessage: function (options) {
    console.log('options in share app message', options)

    if (options.target && options.target.dataset.user_id) {
      return {
        title: 'Check out my giveaways! 👀',
        imageUrl: '/images/head.jpeg',
        path: `/pages/giveaways/share?user_id=${options.target.dataset.user_id}`
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