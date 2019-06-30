// pages/kaidian/kaidian.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ziliao: [{
      mingmu: '法人身份证照片',
      dsc: '拍照时确保边框完整，字体清晰，亮度均匀',
      image: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=IDcard'
    },{
      mingmu: '营业执照',
      dsc: '需清晰展示文字信息，确保边框完整，字体清晰，亮度均匀',
      image: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=zhizhao'
    },{
      mingmu: '房产证或租赁合同',
      dsc: '需清晰展示文字信息，确保边框完整，字体清晰，亮度均匀',
      image: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=hetong'
    },{
      mingmu: '场地照片',
      dsc: '大门（最好包括门牌号）；公共区域：阳台及窗户护栏照片（二楼以上必须含）；摄像头',
      image: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=changdi'
    }
    ],
    success: false

  },

  /**
   * 页面跳转
   */
  turn_idcard(){
    wx.navigateTo({
      url: '/pages/idcard/idcard'
    })
  },

  /**
   * 获取用户状态，决定页面的显示
   */
  getStatus(){
    var that = this
    var nickName = app.globalData.userInfo.nickName
    var data = { 'nickName': nickName }
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + 'auth/status',
      header: {
        "content-type": "application/json"
      },
      data: data,
      method: 'POST',
      success: function (res) {
        var status = res.data.data.status
        if (status == '审核通过') {
          that.setData({
            success: true
          })
          var nickName = app.globalData.userInfo.nickName
          wx.request({
            url: app.globalData.serverUrl + app.globalData.apiVersion + 'auth/getName',
            header: {
              "content-type": "application/json"
            },
            method: 'POST',
            data: {'nickName': nickName},
            success: function(res){
              var name = res.data.data.name
              that.setData({
                name: name
              })
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStatus()
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