// pages/goal/goal.js
Page({

  /**
   * Page initial data
   */
  toUpload(e){
    wx.navigateTo({
      url: '/pages/upload/upload',
    })
  },
  data: {

  },
  bindViewTap(e) {
    const data = {
      user: {
        max_number: e.detail.value.max_number
      }
    }
    const header = getApp().globalData.header;
    let num=parseInt(data.user.max_number);
    // console.log('yes', typeof(parseInt(num)));
    if (num && num>0) {
      wx.request({
            url: 'http://localhost:3000/api/v1/users/update', // real url address
            header: header,
            data: data,
            method:'PUT',
            success (res) {
            // if successful
              console.log('INSIDE GOAL.JS', res.data.max_number);
              // console.log(globalThis);
              wx.navigateTo({
                url: '/pages/closet/closet'
              })
            },
            fail(rej){
            // if fail
              console.log(111,rej.data)
            }
          })
    }else{
      wx.showModal({
        title: "only number",
        content: 'Please enter a valid number! ',
        success (res) {
          if (res.confirm) {
            console.log("User clicks OK.")
          } else if (res.cancel) {
            console.log('User clicks to cancel ')
          }
        }
      })
    }
    
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
