// pages/addbaby/addbaby.js
import data from '../findjob/data.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    touxiang: null,
    date: null,
    name: null,
    sex: null,
    card_type:null,
    idcard: null,
    school: null,
    school_area: null,
    grade: ['未上学', '幼儿园小小班', '幼儿园小班', '幼儿园中班', '幼儿园大班', '一年级', '二年级', '三年级' ,'四年级', '五年级', '六年级', '初一', '初二', '初三', '高一', '高二', '高三'],
    connect_man: null,
    connect_phone: null,
    guomin: false,
    picker: ['身份证', '护照', '港澳身份证', '出生证明', '台湾身份证'],
    region: ['湖南省', '衡阳市', '蒸湘区'],
    visible: true,
    placeholder: '暂无过敏史',
    guomin_fanying: null
  },

  textareaBInput: function (e) {
    this.setData({
      textareaVal: e.detail.dataset.value
    })
  },

  formSubmit(e){
    console.log(e)
    var that = this
    var header = { 'content-type': 'application/json' } //请求头
    var touxiang = that.data.touxiang
    var name = e.detail.value.name
    var card_type = e.detail.value.card_type
    var idcard = e.detail.value.idcard
    var connect_man = e.detail.value.connect_man
    var connect_phone = e.detail.value.connect_phone
    console.log(connect_man=='')
    if ((touxiang != null & touxiang != '') & (name != null & name != '') & (card_type != null & card_type != '') & (idcard!=null & idcard!='') & (connect_man!=null & connect_man!='') & (connect_phone!=null & connect_phone!='')){
      wx.showToast({
        title: '保存成功'
      })
      var data = e.detail.value
      console.log(data)
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          var userInfo = res.userInfo
          wx.login({
            success(res){
              data['code'] = res.code
              data['appid'] = app.globalData.appId
              if (that.data.action == 'add') {
                wx.uploadFile({
                  url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/upload',
                  filePath: that.data.touxiang[0],
                  name: 'touxiang',
                  success(res) {
                    console.log(res)
                    console.log(JSON.parse(res.data))
                    var image = JSON.parse(res.data).data[0].md5
                    data['touxiang'] = image
                    data['id'] = that.data.id
                    data['action'] = that.data.action
                    wx.request({
                      url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/baby',
                      method: 'POST',
                      header: header,
                      data: data,
                      success(res) {
                        console.log(res)
                        wx.navigateBack({
                          url: '/pages/postbaby/postbaby'
                        })
                      }
                    })
                  }
                })
              } else {
                data['touxiang'] = that.data.touxiang_md5
                data['id'] = that.data.id
                data['action'] = that.data.action
                wx.request({
                  url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/baby',
                  method: 'POST',
                  header: header,
                  data: data,
                  success(res) {
                    console.log(res)
                    wx.navigateBack({
                      url: '/pages/postbaby/postbaby'
                    })
                  }
                })
              }
            }
          })  
        }
      })
    }else{
      wx.showModal({
        content: '标注‘ * ’为必填项，请填写完整后提交保存',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  selected(e){
    var that = this
    console.log(e.detail.value)
    if(e.detail.value=='有'){
      that.setData({
        visible: false,
        placeholder: '过敏原及注意事项'
      })
    }else{
      that.setData({
        visible: true,
        placeholder: '暂无过敏史'
      })
    }
  },

  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },

  GradeChange(e){
    console.log(e)
    this.setData({
      index1: e.detail.value
    })
  },

  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  upload_touxiang(){
    var that = this
    wx.chooseImage({
      success: function(res) {
        var temFilePaths = res.tempFilePaths
        console.log(temFilePaths)
        that.setData({
          touxiang: temFilePaths
        })
      },
      count: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var action = options.action
    that.setData({
      action: action
    })
    if(options.baby){
      var baby = decodeURIComponent(options.baby)
      var baby = JSON.parse(baby)
      console.log(baby)
      for (var n = 0; n < that.data.picker.length; n++) {
        console.log(that.data.picker[n])
        if (baby.card_type == that.data.picker[n]) {
          console.log('证件类型：', that.data.picker[n])
          that.setData({
            index: n
          })
          console.log('索引：', that.data.index)
        }
      }
      for (var n = 0; n < that.data.grade.length; n++) {
        if (baby.grade == that.data.grade[n]) {
          that.setData({
            index1: n
          })
        }
      }
      that.setData({
        touxiang_md5: baby.touxiang,
        touxiang: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=' + baby.touxiang,
        name: baby.name,
        date: baby.date,
        sex: baby.sex,
        idcard: baby.idcard,
        school: baby.school,
        region: baby.school_area,
        connect_man: baby.connect_man,
        connect_phone: baby.connect_phone,
        by_connect_man: baby.by_connect_man,
        by_connect_phone: baby.by_connect_phone,
        guomin: baby.guomin,
        placeholder: baby.allergy,
        id: baby.id
      })
    }
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