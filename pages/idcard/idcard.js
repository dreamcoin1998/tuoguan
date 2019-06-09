// pages/idcard/idcard.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageID_Z: [],
    imageID_Z_selected: false,
    imageID_F: [],
    imageID_F_selected: false,
    image_Y: [],
    imageID_Y_selected: false,
    color: 'purple',
    wenzi: '下一步',
    action: true,
    hover: 'button-hover'
  },

  ViewImage_Z(e) {
    wx.previewImage({
      urls: this.data.imageID_Z
    });
  },

  ViewImage_F(e) {
    wx.previewImage({
      urls: this.data.imageID_Z
    });
  },

  ViewImage_Y(e) {
    wx.previewImage({
      urls: this.data.imageID_Z
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '删除图片',
      content: '您确定要删除所选图片吗',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        console.log(e)
        if (res.confirm) {
          var type = e.currentTarget.dataset.type
          if (type =='imageID_Z'){
            this.setData({
              imageID_Z: [],
              imageID_Z_selected: false
            })
          }
          else if (type =='imageID_F'){
            this.setData({
              imageID_F: [],
              imageID_F_selected: false
            })
          }else{
            this.setData({
              image_Y: [],
              imageID_Y_selected: false
            })
          }
        }
      }
    })
  },

  ChooseImg_Z(){
    var that = this
    if(that.data.action){
      wx.chooseImage({
        count: 1,
        success: function (res) {
          var imagePath = res.tempFilePaths
          that.setData({
            imageID_Z: imagePath,
            imageID_Z_selected: true
          })
        },
      })
    }
  },

  ChooseImg_F() {
    var that = this
    if(that.data.action){
      wx.chooseImage({
        count: 1,
        success: function (res) {
          var imagePath = res.tempFilePaths
          that.setData({
            imageID_F: imagePath,
            imageID_F_selected: true
          })
        },
      })
    }
  },

  ChooseImg_Y() {
    var that = this
    if(that.data.action){
      wx.chooseImage({
        count: 1,
        success: function (res) {
          var imagePath = res.tempFilePaths
          that.setData({
            image_Y: imagePath,
            imageID_Y_selected: true
          })
        },
      })
    }
  },


  /**
   * 上传图片，后台进行身份证识别后，接收返回来的数据传递至下一页用户进行确认
   */
  next(){
    var that = this
    if(that.data.action){
      if (that.data.imageID_Z.length > 0 & that.data.imageID_F.length > 0 & that.data.image_Y.length > 0) {
        wx.showLoading({
          title: '正在上传'
        })
        var imagePath = that.data.imageID_Z.concat(that.data.imageID_F)
        var imagePath = imagePath.concat(that.data.image_Y)
        var nickName = app.globalData.userInfo.nickName
        for (var n = 0; n < imagePath.length; n++) {
          wx.uploadFile({
            url: app.globalData.serverUrl + app.globalData.apiVersion + 'auth/image?nc=' + nickName,
            filePath: imagePath[n],
            name: nickName + [n],
            success(res){
              wx.hideLoading()
              console.log('上传成功')
              that.setData({
                color: 'white',
                wenzi: '正在审核中',
                action: false,
                hover: 'none'
              })
            },
            fail(){
              wx.hideLoading()
            }
          })
        }
        wx.hideLoading()
      }
      else{
        console.log('选定图片')
        wx.showModal({
          title: '图片尚未选定，请选择图片',
          showCancel: false
        })
      }
    }
  },

  getStatus(){
    var that = this
    var nickName = app.globalData.userInfo.nickName
    var data = {'nickName': nickName}
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + 'auth/status' ,
      header: {
        "content-type": "application/json"
      },
      data: data,
      method: 'POST',
      success: function(res){
        var status = res.data.data.status 
        if(status=='不存在'){
          that.setData({
            color: 'purple',
            wenzi: '下一步',
            action: true
          })
        }else if(status == '审核失败'){
          that.setData({
            color: 'purple',
            wenzi: status + '，重新提交',
            action: true
          })
          wx.showModal({
            title: '审核结果',
            content: '审核失败，请重新上传图片，并确保图片清晰可见',
            showCancel: false
          })
        }else if(status == '审核通过'){

        }else{
          that.setData({
            color: 'white',
            wenzi: status,
            action: false,
            hover: 'none'
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