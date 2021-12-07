// components/item/item.js
Component({
  /**
   * Component properties
   */
  properties: {
    item: {
      type: Object
    }
  },
  

  /**
   * Component initial data
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
  lifetimes: {
    attached:  function() {
      
        }
  },
  ready: function() {
    console.log("ready")
    let tag_list = this.data.item.tag_list;
    let { typeArray } = this.data
    tag_list.forEach(tag => {
      // {
      //   name: 'work',
      //   num: 7,
      //   selected: false,
      // }
      typeArray.filter(element => element.name === tag)[0].selected = true
    })
    console.log({typeArray})
    this.setData({typeArray})
    console.log('item component data', this.data)
  }
  /**
   * Component methods
   */
  
})
