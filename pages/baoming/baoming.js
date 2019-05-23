// pages/baoming/baoming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:null,
    shangjia: null
  },

  turn_odr(res) {
    var data = this.data.shangjia
    wx.navigateTo({
      url: '/pages/shangjia/shangjia?value=' + encodeURIComponent(JSON.stringify(data))
    })
  },

  phone() {
    wx.makePhoneCall({
      phoneNumber: '0734-8282553'
    })
  },

  turn_dingdan() {
    wx.showLoading({
      title: '加载中'
    })
    var value = this.data.value
    var value = JSON.stringify(value)
    var value = encodeURIComponent(value)
    wx.navigateTo({
      url: '/pages/dingdan/dingdan?value=' + value
    })
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.shangjia)
    var that = this
    var value = decodeURIComponent(options.value)
    var value = JSON.parse(value)
    var shangjia = decodeURIComponent(options.shangjia)
    var shangjia = JSON.parse(shangjia)
    console.log(value)
    console.log(shangjia)
    that.setData({
      value: value,
      shangjia: shangjia
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