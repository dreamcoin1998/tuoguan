// pages/job/job.js
const app = getApp()
const imagePath = app.globalData.serverUrl + app.globalData.apiVersion + 'server/job?md5='
const cookieUtil = require("../../utils/cookie.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xinxi : null,
    tuoguan: null,
    isShenqing: false
  },

  shenqing(e){
    var that = this
    if (!app.globalData.auth.isAuthorized && e.detail.userInfo) {
      wx.showLoading()
      var userInfo = e.detail.userInfo
      app.globalData.userInfo = userInfo
      wx.login({
        success: function (res) {
          var code = res.code
          var appId = app.globalData.appId
          var nickName = app.globalData.userInfo.nickName
          wx.request({
            url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/auth',
            method: 'POST',
            data: {
              code: code,
              appId: appId,
              nickName: nickName
            },
            header: {
              "content-type": "application/json"
            },
            success: function (res) {
              console.log('返回请求：', res)
              wx.hideLoading()
              var cookie = cookieUtil.getSessionIDFromResponse(res)
              cookieUtil.setCookieToStorage(cookie)
              that.setData({
                hasUserInfo: true,
                userInfo: app.globalData.userInfo
              })
              app.setAuthStatus(true)
              wx.showLoading({
                title: '申请中',
                success() {
                  that.setData({
                    isShenqing: true
                  })
                  wx.hideLoading()
                  wx.showToast({
                    title: '申请成功'
                  })
                }
              })
            },
            fail() {
              wx.hideLoading()
              wx.showToast({
                title: '授权失败',
                icon: 'none'
              })
            }
          })
        },
        fail() {
          wx.hideLoading()
          wx.showToast({
            title: '授权失败',
            icon: 'none'
          })
        }
      })
    } else if (app.globalData.auth.isAuthorized){
      console.log("执行哈哈哈")
      wx.showLoading({
        title: '申请中',
        success() {
          that.setData({
            isShenqing: true
          })
          wx.hideLoading()
          wx.showToast({
            title: '申请成功'
          })
        }
      })
    }else{
      wx.hideLoading()
      wx.showToast({
        title: '授权失败',
        icon: 'none'
      })
    }
  },
  /**
   * 获取招聘信息对应的托管所信息
   */
  getXinxi: function(event){
    var that = this
    var header = { 'content-type': 'application/json' }
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/shangjia',
      method: 'POST',
      header: header,
      data: {'xinxi_id': event},
      success: function(res){
        console.log(res)
        that.setData({
          tuoguan: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this
    var recruitment = JSON.parse(options.postid)
    for(var i = 0; i < recruitment.image.length; i++){
      recruitment.image[i] = imagePath + recruitment.image[i]
    }
    that.getXinxi(recruitment.id)
    this.setData({
      xinxi: recruitment
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('执行')
      return {
        title: '好托管在线',
        path: "pages/homepage/homepage"
      }
    }
    console.log('执行2')
    return {
      title: '好托管在线',
      path: "pages/homepage/homepage"
    }
  }
})