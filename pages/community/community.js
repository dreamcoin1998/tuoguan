// pages/community/community.js
const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
const imageUrl = app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5='

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible2: false,
    shequn: '/pages/images/shequn.jpg',
    guanshu: imageUrl + 'guanshu',
    haotuoguan: imageUrl+ 'haotuoguan',
    shejiao: imageUrl + 'shejiao',
    bianxing: imageUrl + 'bianxing',
    xingqu: imageUrl + 'xingqu',
    huati: [{
      name: "孩子管束讨论",
      jianjie: "简介：当孩子任性胡闹，适当管束比纵容更正确，家长们又有什么好措施呢？",
      picture: imageUrl + 'guanshu',
      dingtu: imageUrl + 'guanshutu'
    },{
      name: '熊孩子"变乖宝宝"',
      jianjie: "简介：如何让熊孩子变成乖孩子？一起来看看吧。",
      picture: imageUrl + 'bianxing',
      dingtu: imageUrl + 'bianxing'
    },{
      name: '培养社交小达人',
      jianjie: '简介：如何把孩子培养成社交小达人，快来谈谈你的看法吧。',
      picture: imageUrl + 'shejiao',
      dingtu: imageUrl + 'daren'
    },{
      name: '兴趣班选择',
      jianjie: '简介：孩子的性格迥异，该如何针对性格来选择兴趣班呢？',
      picture: imageUrl + 'xingqu',
      dingtu: imageUrl + 'aihao'
    },{
      name: '好托管的基本要求',
      jianjie: '简介：一个好的托管机构，该具备哪些要素呢？快来谈谈吧。',
      picture: imageUrl+ 'haotuoguan',
      dingtu: imageUrl + 'goodtuoguan'
    }]
  },

  turn_ticket() {
    wx.navigateTo({
      url: '/pages/ticket/ticket'
    })
  },

  open2() {
    this.setData({
      visible2: true,
    })
  },

  /**
   * 点击话题跳转
   */
  turn_shequn(e){
    var huati = e.currentTarget.dataset.huati
    var huati = JSON.stringify(huati)
    console.log(huati)
    wx.navigateTo({
      url: '/pages/shequn/shequn?huati=' + encodeURIComponent(huati)
    })
  },


  ChooseCheckbox(e) {
    console.log(e)
    var that = this
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    var index = e.currentTarget.dataset.value.value
    if (!items[index].checked) {
      for (let i = 0, lenI = items.length; i < lenI; ++i) {
        if (items[i].value == values.value) {
          items[i].checked = !items[i].checked;
          that.setData({
            kecheng: "￥" + items[i].pay + ".00/月 " + "￥" + items[i].pay * 4.5 + ".00/学期",
            type: items[i].type,
            eatcost: items[i].eatcost,
            value: values
          })
        } else {
          items[i].checked = false
        }
      }
      this.setData({
        checkbox: items
      })
    }
  },

  onClose(key) {
    console.log('onClose')
    this.setData({
      [key]: false,
    })
  },

  onClose2() {
    this.onClose('visible2')
  },

  close2() {
    this.setData({
      visible2: false,
    })
    if (this.data.value) {
      wx.navigateTo({
        url: '/pages/baoming/baoming?value=' + encodeURIComponent(JSON.stringify(this.data.value))
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})