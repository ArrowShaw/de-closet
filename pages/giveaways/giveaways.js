// pages/giveaways/giveaways.js
const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    selected: [],
    checked: false,
    status: ['free', 'booked', 'gone'],
    index: 0,
    itemName: 'item'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const page = this;
    console.log('options',{options})
    page.setData({
      currentUser: app.globalData.user
    })
    // /pages/giveaways/giveaways
    // options: {}
    // /pages/giveaways/giveaways?user_id=1
    // { user_id: 1 }
    const path = options.user_id ? `/items?req_type=giveaways&user_id=${options.user_id}` :  `/items?req_type=giveaways`
    const {header} = app.globalData;
    // console.log(app.globalData.baseUrl)
    // console.log(path)
    wx.request({
      url: `${app.globalData.baseUrl}${path}`,
      method: 'GET',
      header: header,
      // data: { req_type: 'giveaways'},
      success (res) {
        console.log('giveaways',res.data)
        page.setData({
          currentNum: res.data.number_of_items,
          targetNum: res.data.user.max_number,
          user: res.data.user
        })
        const itemData = res.data.items
        itemData.forEach(function(item, index){
          console.log('each item', item)
          console.log('index', index)
          // const itemId = item.id
          // console.log('item id', item.id)
          if (item.giveaway_info.length === 0) {
            item['like'] = "like.png"
          } else {
            item.giveaway_info.forEach(function(giveaway, index){
              console.log("giveaway.user_id", giveaway.user_id)
              if (giveaway.user_id === page.data.user.id) {
                item['like'] = "liked.png"
              } else {
                item['like'] = "like.png"
              }
            })
          }
          page.setData({
            giveaways: itemData
          })
          console.log('page giveaways', page.data.giveaways)
          if(page.data.giveaways.length > 1){
            page.setData({
              itemName: 'items'
            })
          }
        })
      }
    })
  },

  onClick: function(e){
    let page = this;
    console.log("e data", e)
    const { header } = app.globalData;
    const item_id = e.currentTarget.dataset.id;
    const giveaways = page.data.giveaways;
    console.log("giveaways in onClick", giveaways)
    const item = giveaways.find(function(giveaways, index, arrs) {
      return giveaways.id === item_id
    })
    const index = giveaways.findIndex(function(id, index, arr){
      return id = item_id
    })
    // console.log("index", index)
    // console.log('item', item)
    const path = e.user_id ? `/items?req_type=giveaways&user_id=${e.user_id}` :  `/items?req_type=giveaways`
    console.log('path in click', path)
    console.log('item.like', item.like)
    if(item.like === "like.png"){
      wx.getUserProfile({
        desc: 'for completing user file', // declare how the info is used
        success: (res) => {
          page.setData({
            userInfo: res.userInfo
          })
          console.log('userInfo', page.data.userInfo)
          wx.request({
            url: `${app.globalData.baseUrl}/giveaways`,
            method: 'POST',
            header: header,
            data: {
              item_id: item_id,
              avatar: page.data.userInfo.avatarUrl,
              nickname: page.data.userInfo.nickName
            },
            success (res) {
              console.log(res.data)
              wx.request({
                url: `${app.globalData.baseUrl}${path}`,
                method: 'GET',
                header: header,
                // data: { req_type: 'giveaways'},
                success (res) {
                  console.log('giveaways',res.data)
                  page.setData({
                    currentNum: res.data.number_of_items,
                    targetNum: res.data.user.max_number,
                    user: res.data.user
                  })
                  const itemData = res.data.items
                  itemData.forEach(function(item, index){
                    console.log('each item', item)
                    console.log('index', index)
                    // const itemId = item.id
                    // console.log('item id', item.id)
                    if (item.giveaway_info.length === 0) {
                      item['like'] = "like.png"
                    } else {
                      item.giveaway_info.forEach(function(giveaway, index){
                        console.log("giveaway.user_id", giveaway.user_id)
                        if (giveaway.user_id === page.data.user.id) {
                          item['like'] = "liked.png"
                        } else {
                          item['like'] = "like.png"
                        }
                      })
                    }
                    page.setData({
                      giveaways: itemData
                    })
                    console.log('page giveaways', page.data.giveaways)
                    if(page.data.giveaways.length > 1){
                      page.setData({
                        itemName: 'items'
                      })
                    }
                  })
                }
              })
          //     wx.request({
          //       url: `${app.globalData.baseUrl}${path}`,
          //       header: header,
          //       method: 'GET',
          //       success (res) {
          //         // item.like = "liked.png"
          //         page.setData({
          //           giveaways: res.data.items,         
          //           [`giveaways[${index}].like`]: "liked.png",
          //           // [`giveaways[${index}].likes`]: res.data.num
          //         })
            //     }
            //   })
            }
          })
        }
      })
    } else {
      const connections = item.giveaway_info
      const connection = connections.find(function(connections, index, arrs){
        return connections.user_id = page.data.user.id
      });
      console.log("connection", connection)
      wx.request({
        url: `${app.globalData.baseUrl}/giveaways/${connection.id}`,
        method: 'DELETE',
        header: header,
        success (res) {
          wx.request({
            url: `${app.globalData.baseUrl}${path}`,
            method: 'GET',
            header: header,
            // data: { req_type: 'giveaways'},
            success (res) {
              console.log('giveaways',res.data)
              page.setData({
                currentNum: res.data.number_of_items,
                targetNum: res.data.user.max_number,
                user: res.data.user
              })
              const itemData = res.data.items
              itemData.forEach(function(item, index){
                console.log('each item', item)
                console.log('index', index)
                // const itemId = item.id
                // console.log('item id', item.id)
                if (item.giveaway_info.length === 0) {
                  item['like'] = "like.png"
                } else {
                  item.giveaway_info.forEach(function(giveaway, index){
                    console.log("giveaway.user_id", giveaway.user_id)
                    if (giveaway.user_id === page.data.user.id) {
                      item['like'] = "liked.png"
                    } else {
                      item['like'] = "like.png"
                    }
                  })
                }
                page.setData({
                  giveaways: itemData
                })
                console.log('page giveaways', page.data.giveaways)
                if(page.data.giveaways.length > 1){
                  page.setData({
                    itemName: 'items'
                  })
                }
              })
            }
          })
          // wx.request({
          //   url: `${app.globalData.baseUrl}${path}`,
          //   header: header,
          //   method: 'GET',
          //   success (res) {
          //     console.log('res in giveaway GET', res.data)
          //     page.setData({
          //       giveaways: res.data.items
          //     })
          //     console.log('item', item)
          //     item.like = "like.png"
          //   }
          // })
        }
      })
    }
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
   * Called {} when user click on the top right corner to share
   */
  onShareAppMessage: function (options) {
    console.log('options in share app message', options)

    if (options.target && options.target.dataset.user_id) {
      return {
        title: 'Check out my giveaways! 👀',
        imageUrl: '/images/head.jpeg',
        path: `/pages/giveaways/share?user_id=${options.target.dataset.user_id}`
      }
    } else {
      return {
        title: 'DeCloset - delutter your closet, save your favourite items only 💗',
        imageUrl: '/images/head.jpeg',
        path: '/pages/index/index'
      }
    }
  }
})