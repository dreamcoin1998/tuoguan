// pages/postbaby/postbaby.js
const app = getApp()
import { $wuxDialog } from '../../dist/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    child: null,
    seleted_baby: null,
    long_tap: false
  },

  turn_addbaby_change(e){
    var that = this
    var long_tap = that.data.long_tap
    if(long_tap){
      that.setData({
        long_tap: false
      })
      return
    }
    console.log(e.currentTarget.dataset.baby)
    var baby = JSON.stringify(e.currentTarget.dataset.baby)
    var baby = encodeURIComponent(baby)
    wx.navigateTo({
      url: '/pages/addbaby/addbaby?baby=' + baby + '&action=change'
    })
  },

  turn_addbaby(){
    wx.navigateTo({
      url: '/pages/addbaby/addbaby?action=add'
    })
  },

  longtap(e){
    var that = this
    that.setData({
      modalName: e.currentTarget.dataset.target
    })
    that.setData({
      seleted_baby: e.currentTarget.dataset.baby,
      long_tap: true
    })
  },

  delete_baby(){
    var that = this
    var baby = that.data.seleted_baby
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/delete',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: baby,
      success(res){
        console.log(res)
        that.setData({
          modalName: null,
          long_tap: false
        })
        that.getChild()
        wx.showToast({
          title: '删除成功'
        })
      }
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null,
      long_tap: false
    })
  },

  getChild(){
    var that = this
    wx.getUserInfo({
      success(res){
        var userInfo = res.userInfo
        var nickname = userInfo.nickName // 获取用户昵称
        wx.request({
          url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/getchild?n=' + nickname,
          success(e){
            console.log(e)
            that.setData({
              child: e.data.data
            })
          }
        })
      }
    })
  },

  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChild()
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
    this.onLoad()
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