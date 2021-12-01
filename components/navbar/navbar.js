// components/navbar/navbar.js
Component({
  /**
   * Component properties
   */
  properties: {
    text: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: false
    },
    home: {
      type: Boolean,
      value: false
    }
  },

  /**
   * Component initial data
   */
  data: {
    // get height of status bar
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // get height of navbar
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
    // get height of menu button on the right
    menuButtonHeight: wx.getStorageSync('menuButtonHeight') + 'px',
    // add height of status bar and navbar
    navigationBarAndStatusBarHeight:
      wx.getStorageSync('statusBarHeight') +
      wx.getStorageSync('navigationBarHeight') +
      'px'
  },

  /**
   * Component methods
   */
  methods: {
    backHome: function () {
      wx.reLaunch({
        url: '/pages/index/index',
      })
    },
    back: function () {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
