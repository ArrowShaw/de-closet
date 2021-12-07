// components/giveaway/giveaway.js
Component({
  /**
   * Component properties
   */
  properties: {
    giveaway: Object,
  },

  /**
   * Component initial data
   */
  data: {
    giveaway: {
      status: 'pending',
      user_id: null
    }
  },

  /**
   * Component methods
   */
  methods: {
    checkboxChange: function (e) {
      const page = this;
      var header = getApp().globalData.header;
      console.log('e', e)
      console.log('items', getApp().globalData.items)
      // url = `${baseUrl}/giveaway`
      wx.request({
        url: url,
        header: header,
        data: page.data,
        method:'POST',
        success (res) {
          console.log('INSIDE UPLOAD.JS', res.data)
        }
      })
      
    },

  }
})
