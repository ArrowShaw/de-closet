// components/tabbar/tabbar.js
const app = getApp();

Component({
  properties: {
    // categories: [],
    activeIndex: {
      type: Number,
      value: null
    },
    currentNum: {
      type: Number
    },
    targetNum: {
      type: Number
    }
  },

  data: {
    items: [
      {
        'title': 'My Closet',
        'icon': '/images/icons/me.png',
        'selectedIcon': '/images/icons/me.png',
        'path': '/pages/closet/closet'
      },
      {
        'title': 'Giveaways',
        'icon': '/images/icons/gift.png',
        'selectedIcon': '/images/icons/gift.png',
        'path': '/pages/giveaways/giveaways'
      },
    ]
  },

  methods: {
    onChangeTab(res) {
      console.log('res', res)
      const index = res.currentTarget.dataset.index;     
      console.log('in onChangeTab Tabbar', {index}) 
      wx.redirectTo({
        url: this.data.items[index].path,
      })
    },

    onClick() {
      const page=this
      const {header} = getApp().globalData
      console.log( {header})
      console.log("the numbers", this.data.currentNum, this.data.targetNum)
     
      if (header) {
        this.checkMaxNumber();
      } else {
        wx.event.on('headersReady', this, checkMaxNumber)
      }
    },

    checkMaxNumber() {

      const { header } = getApp().globalData
      const page = this
      wx.request({
        url: `${getApp().globalData.baseUrl}/users/show`,
        method: 'GET',
        header: header,
        success (res) {
          console.log('data from backend', res.data)
          page.setData({
            max_number: res.data.max_number,
            // currentNum: this.data.currentNum,
            // targetNum: this.data.targetNum
          })
          console.log('max_number', page.data.max_number)
          app.globalData.max_number = page.data.max_number
          console.log('globaldata', app.globalData.max_number)
          // [ {category: "tops", items: [{},{}]}, {category: "bottoms", items: [{},{}] } ]
          console.log(app.globalData, "asdasds")
          if (page.data.targetNum  > 0 && page.data.currentNum < page.data.targetNum) {
            wx.navigateTo({
              url: `/pages/upload/upload?targetNum=${page.data.targetNum}&currentNum=${page.data.currentNum}`
            })
          } else if(page.data.currentNum = page.data.targetNum ) {
            wx.showModal({
              title: "Warning",
              content: 'You have reached your closet limit.',
              success (res) {
                if (res.confirm) {
                  console.log("User clicks OK.")
                } else if (res.cancel) {
                  console.log('User clicks to cancel ')
                }
              }
            })
          } else {
            wx.navigateTo({
              url: '/pages/goal/goal'
            })
          }
        },
        fail(res) {
          console.log('failed')
        }
      })
    }
  }
})
