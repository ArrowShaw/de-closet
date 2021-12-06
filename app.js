// app.js
import event from 'utils/event.js';
wx.event = event
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const app = this;

    // log in
    wx.login({
      success (res) {
        if (res.code) {
          // send url request
          wx.request({
            url: `${app.globalData.baseUrl}/login`,
            method: 'POST',
            data: {
              code: res.code
            },
            success (res) {
              // console.log(res.data)
              app.globalData.header = res.data.headers
              app.globalData.user = res.data.user
              wx.event.emit('headersReady')
              // { "X-USER-EMAIL": ....., "X-USER-TOKEN": ....}
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    // for custom navigation bar
    const { statusBarHeight, platform } = wx.getSystemInfoSync()
    const { top, height } = wx.getMenuButtonBoundingClientRect()

    // height of status bar
    wx.setStorageSync('statusBarHeight', statusBarHeight)
    // height of menuButton default 32
    wx.setStorageSync('menuButtonHeight', height ? height : 32)
    
    // whether menubutton height is accessed
    if (top && top !== 0 && height && height !== 0) {
        const navigationBarHeight = (top - statusBarHeight) * 2 + height
        // height of navbar
        wx.setStorageSync('navigationBarHeight', navigationBarHeight)
    } else {
        wx.setStorageSync(
          'navigationBarHeight',
          platform === 'android' ? 48 : 40
        )
    }
  },
  globalData: {
    header: null,
    user: null,
    // baseUrl: "https://de-closet-backend.wogengapp.cn/api/v1"
    baseUrl: "http://localhost:3000/api/v1"
  },
})
