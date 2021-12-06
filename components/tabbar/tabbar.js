// components/tabbar/tabbar.js
const app = getApp();

Component({
  properties: {
    // categories: [],
    activeIndex: {
      type: Number,
      value: 1
    },
  },

  data: {
    add: {
      'title': 'Add',
      'icon': '/images/icons/add.png',
      'selectedIcon': '/images/icons/add.png',
      'path': '/pages/upload/upload',
    },
    items: [
      {
        'title': 'Home',
        'icon': '/images/icons/home.png',
        'selectedIcon': '/images/icons/home.png',
        'path': '/pages/index/index'
      },
      {
        'title': 'Me',
        'icon': '/images/icons/me.png',
        'selectedIcon': '/images/icons/me.png',
        'path': '/pages/closet/closet'
      },
    ]
  },

  methods: {
    onChangeTab(res) {
      const index = res.currentTarget.dataset.index;     
      console.log('in onChangeTab Tabbar', {index}) 
      // wx.switchTab({
      //   url: this.data.items[index].path
      // })
      wx.redirectTo({
        url: this.data.items[index].path,
      })
    },

    onClick() {
      const page=this
      const {header} = getApp().globalData
      console.log( {header})

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
            max_number: res.data.max_number
          })
          console.log('max_number', page.data.max_number)
          app.globalData.max_number = page.data.max_number
          console.log('globaldata', app.globalData.max_number)
          // [ {category: "tops", items: [{},{}]}, {category: "bottoms", items: [{},{}] } ]
          console.log(app.globalData, "asdasds")
          if (app.globalData.max_number > 0) {
            wx.redirectTo({
              url: '/pages/upload/upload'
            })
          } else {
            wx.redirectTo({
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
