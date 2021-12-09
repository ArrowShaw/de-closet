// pages/goal/goal.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    max_number: 0,
    hasUserInfo: false
  },
  async bindViewTap(e) {
   
    // user.max_number
    // user.closet_size
    console.log('in bindViewTap')
    
    let data;
    if (this.data.hasUserInfo) {
      data = {
        user: {
          max_number: e.detail.value.max_number,
        }
      }
    } else {
      const userInfo = await this.getUserProfile()
      data = {
        user: {
          max_number: e.detail.value.max_number,
          nickname: userInfo.nickname,
          avatar: userInfo.avatar
        }
      }
    }

    let page = this;
    app.globalData.max_number = e.detail.value.max_number
    console.log('global data', app.globalData.max_number)
    const { header } = app.globalData;
    
    console.log('user', data)
    let num=parseInt(data.user.max_number);
    let closet_size = page.data.closet_size
    
    
    
    // console.log('yes', typeof(parseInt(num)));
    if (num && num>0) {
      console.log(header)
      console.log(data)
      if (num<=200){
        if(num >= closet_size){
          wx.request({
            header: header,
            data: data,
            url: `${app.globalData.baseUrl}/users/update`,
            method:'PUT',
            success (res) {
              
            // if successful
              console.log('INSIDE GOAL.JS', res.data);
              const closet_size = res.data.closet_size
              console.log('closet_size', closet_size)
              const { user } = app.globalData
              app.globalData.user = res.data
              // user.avatar = res.data.avatar
              // user.nickname = res.data.nickname
              // app.globalData.user = user
              // console.log('global user', app.globalData.user);
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
            title: "Warning",
            content: 'You have to declutter your closet before you set a new goal!',
            success (res) {
              if (res.confirm) {
                console.log("User clicks OK.")
              } else if (res.cancel) {
                console.log('User clicks to cancel ')
              }
  
          }
        })
        }
       
      }else{
        wx.showModal({
          title: "Too many",
          content: 'You cannot have more than 200 items ',
          success (res) {
            if (res.confirm) {
              console.log("User clicks OK.")
            } else if (res.cancel) {
              console.log('User clicks to cancel ')
            }

        }
      })
    }
      
    }else{
      wx.showModal({
        title: "Only Number",
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
    console.log("IN GOAL.JS ONLOAD")
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    if(app.globalData.user.max_number){
      console.log('user data in goal', app.globalData.user)
      this.setData({
        max_number: app.globalData.user.max_number,
        hasUserInfo: app.globalData.hasUserInfo,
        closet_size: app.globalData.user.closet_size
      })

    }
  },

  getUserProfile: function(){
    return new Promise((resolve, reject) => {
      
        wx.getUserProfile({
          desc: 'for completing user file', // declaire how the info is used
          success: (res) => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            app.globalData.userInfo = res.userInfo
            app.globalData.hasUserInfo = true
            console.log('global userInfo', app.globalData.userInfo)
            const data = {
              nickname: res.userInfo.nickName,
              avatar: res.userInfo.avatarUrl
            }
            resolve(data)
          },
          fail: (res) => {
            wx.showToast({
              title: 'Declined',
              icon: 'error',
              duration: 1000
            })
            reject(false)
          }
        }) 
       
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
  // onShareAppMessage: function () {
  //   return {
  //     title: 'DeCloset - delutter your closet, save your favourite items only 💗',
  //     imageUrl: '/images/head.jpeg',
  //     path: '/pages/index/index'
  //   }
  // }
})