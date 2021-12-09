// pages/details/details.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
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
    // let item = JSON.parse(options.item);
    let page = this;
    let { header } = app.globalData;
    const { id } = options;
    this.setData({
      currentUser: app.globalData.user
    })
    wx.request({
      url: `${app.globalData.baseUrl}/items/${id}`,
      header: app.globalData.header,
      success(res) {
        console.log('show route res', res)
        page.setData({
          item: res.data.item
        })
        let tag_list = res.data.item.tag_list;
        let { typeArray } = page.data
        tag_list.forEach(tag => {
          typeArray.filter(element => element.name === tag)[0].selected = true
        })
        console.log({typeArray})
        page.setData({typeArray})
        console.log('item component data', page.data)
        if(tag_list.length != 0){
          page.setData({
            tagExist: true
          })
        }else{
          page.setData({
            tagExist: false
          })
        }
        console.log(page.data.tagExist)
      }
    })
    // console.log("this is item", item)
    // page.setData({item: item})
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
  },

  // checkbox
  onClick: function(){
    const page = this;
    let { header } = app.globalData;
    wx.getUserProfile({
      desc: 'for completing user file', // declaire how the info is used
      success: (res) => {
        page.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log('userInfo', page.data.userInfo)
        wx.request({
          url: `${app.globalData.baseUrl}/giveaways`,
          data: {
            user: {
              nickname: page.data.userInfo.nickName,
              avatar: page.data.userInfo.avatarUrl
            }
          },
          header: app.globalData.header,
          method: 'POST',
          success (res) {
            console.log(res)
          }
        })
        wx.showToast({
          title: 'success',
          icon: 'success',
          duration: 1000
        })
      }
    })
    wx.request({
      url: `${app.globalData.baseUrl}/giveaways`,
      method: 'POST',
      header: header,
      data: { userInfo: page.data.userInfo },
      success (res) {
        console.log(res.data)
      }
    })
  },

  editItem: function(){
    wx.navigateTo({
      url: `/pages/update/update?item_id=${this.data.item.id}`,
    })
  },

  deleteItem: function(){
    let page = this;
    let {header} = app.globalData
    wx.showModal({
      title: 'Notice',
      content: 'Are you sure?',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: `${app.globalData.baseUrl}/items/${page.data.item.id}`,
            header: header,
            method: 'DELETE',
            data: { item_id: page.data.item.id },
            success (res) {
              if(page.data.item.is_giveaway == false){
                wx.navigateTo({
                  url: '/pages/closet/closet',
                })
              }else{
                wx.navigateTo({
                  url: '/pages/giveaways/giveaways',
                })
              }
            }
          })
          console.log("User clicks OK.")
        } else if (res.cancel) {
          console.log('User clicks to cancel ')
        }
      }
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
    return {
      title: 'DeCloset - delutter your closet, save your favourite items only 💗',
      imageUrl: '/images/head.jpeg',
      path: '/pages/index/index'
    }
  }
})