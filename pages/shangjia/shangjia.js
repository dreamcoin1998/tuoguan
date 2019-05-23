// pages/shangjia/shangjia.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: null,
    kecheng: '请选择课程',
    type: null,
    eatcost: null,
    visible2: false,
    shangjia: null,
    denglu: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=denglu',
    baozhang: app.globalData.serverUrl + app.globalData.apiVersion +  'server/image?md5=baozhang',
    checkbox: [{
      value: 0,
      name: '2019第一学期午托班',
      shangjia:'儒家托管',
      imagePath: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=rujia',
      kecheng: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=kecheng',
      type: '【午托】',
      student: '一年级，二年级，三年级，四年级，五年级，六年级',
      date: '2019.02.19',
      renshu: 15,
      pay: 500,
      eatcost: 264.0,
      checked: false,
      hot: false,
    }, {
      value: 1,
      name: '2019第一学期晚托班',
      shangjia: '儒家托管',
      imagePath: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=rujia',
      kecheng: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=kecheng',
      type: '【晚托】',
      student: '一年级，二年级，三年级，四年级，五年级，六年级',
      date: '2019.02.19',
      renshu: 15,
      pay: 1500,
      eatcost: 264.0,
      checked: false,
      hot: false,
    }],
    swiperList: [{
      id: 0,
      type: 'image',
      url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=zhaotuoguan1'
    }, {
      id: 1,
      type: 'image',
      url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=zhaotuoguan2',
    }, {
      id: 2,
      type: 'image',
      url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=zhaotuoguan3'
    }]
  },

  baoming(res){
    var that = this
    var value = res.currentTarget.dataset.item
    var value = JSON.stringify(value)
    var shangjia = JSON.stringify(that.data.shangjia)
    wx.navigateTo({
      url: '/pages/baoming/baoming?value=' + encodeURIComponent(value) + "&shangjia=" + encodeURIComponent(shangjia)
    })
  },

  open2() {
    this.setData({
      visible2: true,
    })
  },

  ChooseCheckbox(e) {
    console.log(e)
    var that = this
    let items = this.data.shangjia.tuoguan;
    let values = e.currentTarget.dataset.value; //获取托管形式
    var index = e.currentTarget.dataset.value.value //托管形式下标
    if (!items[index].checked){
      for (let i = 0, lenI = items.length; i < lenI; ++i) {
        if (items[i].value == values.value) {
          items[i].checked = !items[i].checked;
          var shangjia = that.data.shangjia
          shangjia.tuoguan = items
          that.setData({
            kecheng: "￥" + items[i].pay + ".00/月 " + "￥" + items[i].pay * 4.5 + ".00/学期",
            type: items[i].type,
            eatcost: items[i].eatcost,
            value: values,
            shangjia: shangjia
          })
        } else {
          items[i].checked = false
          var shangjia = that.data.shangjia
          shangjia.tuoguan = items
          that.setData({
            shangjia: shangjia
          })
        }
      }
      this.setData({
        checkbox: items
      })
    }
    console.log(that.data.value)
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
    var shangjia = JSON.stringify(this.data.shangjia)
    this.setData({
      visible2: false,
    })
    if (this.data.value) {
      wx.navigateTo({
        url: '/pages/baoming/baoming?value=' + encodeURIComponent(JSON.stringify(this.data.value)) + "&shangjia=" + encodeURIComponent(shangjia)
      })
    }
  },

  /**
   * 拨打电话
   */

  phone(){
    wx.makePhoneCall({
      phoneNumber: '0734-8282553'
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var value = decodeURIComponent(options.value)
    var value = JSON.parse(value)
    console.log(value)
    that.setData({
      shangjia: value
    })
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