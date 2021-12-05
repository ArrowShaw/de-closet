// components/category/category.js
Component({
  /**
   * Component properties
   */
  properties: {
    collection: Object,  // {category: "tops", items: [{}, {}]}
    category: {
      type: String,
      value: ''
    },

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

  }
})
