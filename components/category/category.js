// components/category/category.js
Component({
  /**
   * Component properties
   */
  properties: {
    collection: Object,  // {category: "tops", items: [{}, {}]}
    // category: {
    //   type: String,
    //   value: ''
    // },
  },

  /**
   * Component initial data
   */
  data: {
    item: {
      name: '',
      photo: '',
      tags: [],
      description: '',
    }
  },


  /**
   * Component methods
   */
  methods: {
    detailP: function(e) {
      console.log("e in category component", e)
      const { id } = e.currentTarget.dataset
      // let item = JSON.stringify(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: `/pages/details/details?id=${id}`,
      })
    },
    arrow: function(e){
      // let categories = JSON.stringify(e.currentTarget.dataset.item)
      // wx.navigateTo({
      //   url: `/pages/details/details?item=${item}`,
      // })
      let collection = JSON.stringify(e.currentTarget.dataset.collection)
      wx.navigateTo({
        url: `/pages/categories/categories?collection=${collection}`,
      })

    }
  }
})
