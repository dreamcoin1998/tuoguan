//app.js
const cookieUtil = require('utils/cookie.js')
const app = getApp()

App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    wx.checkSession({
      success(){
        if (cookieUtil.getCookieFromStorage()) {
          that.globalData.auth.isAuthorized = true
        }  
      }
    })
    //获取用户信息
    wx.getUserInfo({
      success: function(res){
        console.log('success')
        that.globalData.userInfo = res.userInfo
        console.log(that.globalData.userInfo.nickName)
      },
      fail: function(res){
        console.log('fail')
      }
    })

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
    // 获取用户设置信息
    wx.getSetting({
      success: res => {
        console.log(res.authSetting)
      }
    })
  },
  getAuthStatus: function () {
    return this.globalData.auth.isAuthorized
  },

  setAuthStatus: function (status) {
    console.log('set auth status: ' + status)
    if (status == true || status == false) {
      this.globalData.auth.isAuthorized = status
      if(status == false){
        this.globalData.userInfo = null
      }
    } else {
      console.log('invalid status.')
    }

  },

  setCity(city){
    if (city){
      this.globalData.city = city
    }
  },

  globalData: {
    userInfo: null,
    appId: 'wx2b23a11573d3a8f7',
    //serverUrl: 'https://api.gaoblog.cn',
    apiVersion: '/api/v1.0/',
    //serverUrl: 'http://192.168.43.202:8000',
    serverUrl: 'http://127.0.0.1:8000',
    city: '',
    auth: {
      isAuthorized: false
    }
  }
})