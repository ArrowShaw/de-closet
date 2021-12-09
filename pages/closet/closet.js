// pages/closet/closet.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    tags: [
      {name:'spring', selected: false,}, 
      {name:'summer', selected: false,}, 
      {name:'autumn', selected: false,}, 
      {name:'winter', selected: false,}, 
      {name:'casual', selected: false,}, 
      {name:'work', selected: false,}, 
      {name:'sporty', selected: false,}, 
      {name:'formal', selected: false,}
    ],
    tagArray: []
  },

onClick: function() {
    wx.redirectTo({
      url: '/pages/goal/goal',
    })
  },

  onClickTag: function(e) {
    let page = this;
    const { header } = app.globalData;
    console.log('e', e)
    const tag = e.currentTarget.dataset.text;
    console.log('tag', tag)
    if(page.data.tagArray.includes(tag)) {
      const index = page.data.tagArray.indexOf(tag);
      page.data.tagArray.splice(index, 1);
    }else{
      page.data.tagArray.push(tag);
    }
    console.log('tagArray', page.data.tagArray)
    wx.request({
      url: `${app.globalData.baseUrl}/items?tag_array=${page.data.tagArray}&req_type=my_closet`,
      header: header,
      method: 'GET',
      success(res){
        console.log('filtered items', res.data)
        page.data.tagArray.forEach(tag => {
          page.data.tags.filter(element => element.name === tag)[0].selected = true
        })
      }
    })

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