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
    ],
    quotes: [
      {name:'- Nathan W. Morris', quote:"I've found that the less stuff I own, the less my stuff owns me."},
      {name:'- Vivienne Westwood', quote:'Buy less, choose well, make it last.'},
      {name:'- Erica Layne', quote:'A calm house equals a calm heart equals a calm life.'},
      {name:'- Marie Kondo', quote:'Keep only things that speak to your heart. Ask yourself: Does this spark your joy?'},
      {name:'- Joshua Fields & Ryan Nicodemus', quote:'Minimalism is a lifestyle that helps people question what things add value to their lives.'},
      {name:'- Joshua Becker', quote:"The first step in crafting the life you want is to get rid of everything you don't."},
      {name:'- Aggy', quote:"You can have too many clothes, but you can't have too many bags."},
      {name:'- Xun', quote:'I decluttered last year. I am so much happier now.'},
      {name:'- Yiyao, Yiwei, Silas & Isabelle', quote:'DeCloset is a great app 👍'}
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
    const quote = page.data.quotes[Math.floor(Math.random()*page.data.quotes.length)];
    console.log('quotes', quote)
    this.setData({
      currentUser: app.globalData.user,
      quote: quote
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

  // "I want this" button
  // onClick: function(){
  //   const page = this;
  //   let { header } = app.globalData;
  //   wx.getUserProfile({
  //     desc: 'for completing user file', // declaire how the info is used
  //     success: (res) => {
  //       page.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //       console.log('userInfo', page.data.userInfo)
  //       wx.request({
  //         url: `${app.globalData.baseUrl}/giveaways`,
  //         data: {
  //           user: {
  //             nickname: page.data.userInfo.nickName,
  //             avatar: page.data.userInfo.avatarUrl
  //           }
  //         },
  //         header: app.globalData.header,
  //         method: 'POST',
  //         success (res) {
  //           console.log(res)
  //         }
  //       })
  //       wx.showToast({
  //         title: 'success',
  //         icon: 'success',
  //         duration: 1000
  //       })
  //     }
  //   })
  //   wx.request({
  //     url: `${app.globalData.baseUrl}/giveaways`,
  //     method: 'POST',
  //     header: header,
  //     data: { userInfo: page.data.userInfo },
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
              app.globalData.user = res.data.user
              if(page.data.item.is_giveaway === false){
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