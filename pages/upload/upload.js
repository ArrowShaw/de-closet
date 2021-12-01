// pages/upload/upload.js

const categories = ['top','bottom','coat','dress','shoes']

Page({

  /**
   * Page initial data
   */
  data: {
    radioItems: [
      {name: 'yes', value: 'item', checked: 'true'},
      {name: 'no', value: 'giveaway'}
    ],
    categories,
 
    itemName: '',
    checked: false,
    state:'',
    show:false,
    showID:'',
    inputValue:'',
    label:[],
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

  radioChange(e) {
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },

  bindChange(e) {
    const val = e.detail.value
    this.setData({
      category: this.data.categories[val[0]],
    })
  },
  // sync input
  bindKeyInput(e) {
    this.setData({
      itemName: e.detail.value
    })
  },
  // choose tags and give to label
  dealTap: function(e) {
    let string = "typeArray[" + e.target.dataset.index + "].selected";
    console.log(!this.data.typeArray[e.target.dataset.index].selected);
    this.setData({
      [string]: !this.data.typeArray[e.target.dataset.index].selected
    })
    let detailValue = this.data.typeArray.filter(it => it.selected).map(it => it.name)
    this.setData({
      label: detailValue
    })
    console.log(this.data.label)
  },

  addinput(e){
    this.setData({
      show: true,
    });
  },
  // close pop-up window
  onClose(){
    this.setData({ show: false});
  },
  // get input value
  bindValue(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  // add new tag
  onInputValue(){
    this.setData({
      show: false,
      inputValue: this.data.inputValue
    });
    var typeArray = this.data.typeArray;
    console.log(this.data.inputValue)
    var newData = { num: typeArray.length, name: this.data.inputValue, selected: false};
    typeArray.push(newData);
    this.setData({
      typeArray,
    })
    console.log(this.data.inputValue)
  },
  // cancel choose
  onCancel(){
    this.setData({ show:false });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
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

  chooseImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
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
      title: 'upload',
      path: 'pages/upload/upload'
    }
  }
})
