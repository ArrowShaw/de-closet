// pages/upload/upload.js

const categories = ['top','bottom','coat','dress','shoes']

Page({

  /**
   * Page initial data
   */
  data: {
    radioItems: [
      {name: 'yes', value: 'item', checked: 'true'},
      {name: 'no', value: 'giveaway'}
    ],
    categories,
    myTagsList: {
      type: ['spring','summer','autumn','winter','casual','formal','sporty','work'],
      multichoice: true
    },
    alreadyselect: false,
    selectMyTag: [],
  },

  radioChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },

  bindChange(e) {
    const val = e.detail.value
    this.setData({
      category: this.data.categories[val[0]],
    })
  },

  selectMyTags(e){
    this.setData({
      selectMyTag: e.detail.type,
      alreadyselect: true
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

  chooseImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
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
      title: 'upload',
      path: 'pages/upload/upload'
    }
  }
})
