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
  },
  globalData: {
    userInfo: null
  }
})
