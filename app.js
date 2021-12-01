// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          const baseUrl = 'http://localhost:3000/api/v1';
          wx.request({
            url: `${baseUrl}/login`,
            method: 'POST',
            data: {
              code: res.code
            },
            success (res) {
              console.log(res.data)
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

    // 状态栏高度
    wx.setStorageSync('statusBarHeight', statusBarHeight)
    // 胶囊按钮高度 一般是32 如果获取不到就使用32
    wx.setStorageSync('menuButtonHeight', height ? height : 32)
    
    // 判断胶囊按钮信息是否成功获取
    if (top && top !== 0 && height && height !== 0) {
        const navigationBarHeight = (top - statusBarHeight) * 2 + height
        // 导航栏高度
        wx.setStorageSync('navigationBarHeight', navigationBarHeight)
    } else {
        wx.setStorageSync(
          'navigationBarHeight',
          platform === 'android' ? 48 : 40
        )
    }
  },
  globalData: {
    userInfo: null
  }
})
