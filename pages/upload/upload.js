// pages/upload/upload.js
Page({

  /**
   * Page initial data
   */
  data: {
    radioItems: [
      {name: 'Yes', value: 'item', checked: 'true'},
      {name: 'No', value: 'giveaway'}
    ],
  
    categories:['Top', 'Bottom', 'Coat', 'Dresses','Shoes'],

    // upload page data
    tempFilePath: '',
    is_giveaway: false,
    item_type: 'Top',
    item_tags: [],
    remark: '',

    itemName: '',
    checked: false,
    state:'',
    show:false,
    inputValue:'',
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
    const page = this
    const checked = e.detail.value
    const changed = {}
    for (let i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    console.log(changed)
    this.setData(changed)
    if (changed['radioItems[1].checked'] === true) {
      page.data.is_giveaway = true
    } else {
      page.data.is_giveaway = false
    }
  },

  bindChangePicker(e) {
    const val = e.detail.value
    console.log('this in bindChange', val)
    this.setData({
      item_type: this.data.categories[val],
    })
    // console.log('item_type', data.item_type)
  },
  // sync input
  bindKeyInput(e) {
    this.setData({
      itemName: e.detail.value
    })
  },
  // choose tags and give to item_tags
  dealTap: function(e) {
    let string = "typeArray[" + e.target.dataset.index + "].selected";
    console.log(!this.data.typeArray[e.target.dataset.index].selected);
    this.setData({
      [string]: !this.data.typeArray[e.target.dataset.index].selected
    })
    let detailValue = this.data.typeArray.filter(it => it.selected).map(it => it.name)
    this.setData({
      item_tags: detailValue
    })
    console.log(this.data.item_tags)
  },

  addinput(e){
    this.setData({
      show: true,
    });
  },
  // close pop-up window
  onClose(){
    this.setData({ show: false });
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


  chooseImg() {
    const page = this;
    // console.log('page', page);
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        // console.log('res', res)
        // const tempFilePath = res.tempFiles[0].tempFilePath
        page.setData ({
          tempFilePath: res.tempFiles[0].tempFilePath
        })
      }
    })
  },

  onInput(e){
    this.setData({
      remark: e.detail.value
    })
  },

  saveThings(e) {
    const page = this;
    // console.log('radioItems', page.data.radioItems)
    console.log('It is page:', page.data)
    var header = getApp().globalData.header;
    wx.request({
      url: 'https://de-closet-backend.wogengapp.cn/api/v1/items', // real url address
      header: header,
      data: page.data,
      method:'POST',
      success (res) {
        console.log('INSIDE UPLOAD.JS', res.data)
        wx.uploadFile({
          url: `https://de-closet-backend.wogengapp.cn/api/v1/items/${res.data.id}/upload`, // real url address
          filePath: page.data.tempFilePath,
          name: 'file',
          header: header,
          success(res) {
            console.log(res)
            const data = res.data
            wx.navigateTo({
              url: '/pages/closet/closet',
            })
          }
        })
        // wx.navigateTo({
        //   url: '/pages/closet/closet'
        // })
      }
    })

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
