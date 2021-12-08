// pages/details/details.js
Page({

  /**
   * Page initial data
   */
  data: {
    selected: [],
    checked: false,
    typeArray: [
      {
        name: 'spring',
        num: 0,
        selected: false,
      },
      {
        name: 'summer',
        num: 1,
        selected: false,
      },
      {
        name: 'autumn',
        num: 2,
        selected: false,
      },
      {
        name: 'winter',
        num: 3,
        selected: false,
      },
      {
        name: 'casual',
        num: 4,
        selected: false,
      },
      {
        name: 'formal',
        num: 5,
        selected: false,
      },
      {
        name: 'sporty',
        num: 6,
        selected: false,
      },
      {
        name: 'work',
        num: 7,
        selected: false,
      }
    ]

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let item = JSON.parse(options.item);
    let page = this;
    console.log("this is item", item)
    page.setData({item: item})
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    console.log("ready")
    let tag_list = this.data.item.tag_list;
    let { typeArray } = this.data
    tag_list.forEach(tag => {
      // {
      //   name: 'work',
      //   num: 7,
      //   selected: false,
      // }
      typeArray.filter(element => element.name === tag)[0].selected = true
    })
    console.log('typeArray changed', {typeArray})
    this.setData({typeArray})
    console.log('item component data', this.data)

  },

  // checkbox
  // checkboxChange: function(e){
  //   console.log('value from checkbox', e)
  //   const page = this;
  //   page.setData({
  //     checked:!this.data.checked
  //     })
  //   const { header } = getApp().globalData
  //   const selected = e.detail.value.selected;
  //   console.log('selected', selected)
  //   wx.getUserProfile({
  //     desc: 'for completing user file', // declaire how the info is used
  //     success: (res) => {
  //       this.setData({
  //         userInfo: res.userInfo
  //       })
  //     }
  //   })
  //   wx.request({
  //     url: `${app.globalData.baseUrl}/giveaways`,
  //     method: 'POST',
  //     header: header,
  //     data: { selected: selected, userInfo: userInfo },
  //     success (res) {
  //       console.log(res.data)
  //     }
  //   })
  // },

  editItem: function(){
    wx.navigateTo({
      url: `/pages/update/update?item_id=${this.data.item.id}`,
    })
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