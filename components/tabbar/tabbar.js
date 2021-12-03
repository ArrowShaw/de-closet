// components/tabbar/tabbar.js
var app = getApp();
Component({
  /**
   * Component properties
   */
  properties: {
    activeIndex: {
      type: Number,
      value: 1
    },
  },

  /**
   * Component initial data
   */
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
 

  /**
   * Component methods
   */
  methods: {
    onChangeTab(res) {
      var index = res.currentTarget.dataset.index;      
      wx.switchTab({
        url: this.data.items[index].path
      })
    },
    toUpload(e){
      wx.navigateTo({
        url: '/pages/upload/upload',
      })
    }
  },
  

})
