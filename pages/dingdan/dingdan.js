// pages/dingdan/dingdan.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shangjia: app.globalData.serverUrl + app.globalData.apiVersion + 'server/image?md5=shangjia',
    date: '2019-5-2',
    pay: null,
    eatcost: null,
    safe: null,
    value: null,
    current: 'tab1',
    tabs: [
      {
        key: 'tab1',
        isShow:true,
        title: '幼儿园',
        child: [{
          class: '0~2岁',
          checked: false,
          value: 0,
          click: false
        },
        {
          class: '小小班',
          checked: false,
          value: 1,
          click: false
        },
        {
          class: '小班',
          checked: false,
          value: 2,
          click: false
        },
        {
          class: '中班',
          checked: false,
          value: 3,
          click: false
        },
        {
          class: '大班',
          checked: false,
          value: 4,
          click: false
        }],
      },
      {
        key: 'tab2',
        isShow: false,
        title: '小学',
        child: [{
          class: '学前班',
          checked: false,
          value: 0,
          click: false
        },
        {
          class: '一年级',
          checked: false,
          value: 1,
          click: false
        },
        {
          class: '二年级',
          checked: false,
          value: 2,
          click: false
        },
        {
          class: '三年级',
          checked: false,
          value: 3,
          click: false
        },
        {
          class: '四年级',
          checked: false,
          value: 4,
          click: false
        },
        {
          class: '五年级',
          checked: false,
          value: 5,
          click: false
        },
        {
          class: '六年级',
          checked: false,
          value: 6,
          click: false
        }],
      },
      {
        key: 'tab3',
        isShow: false,
        title: '中学',
        child: [{
          class: '初一',
          checked: false,
          value: 0,
          click: false
        },
        {
          class: '初二',
          checked: false,
          value: 1,
          click: false
        },
        {
          class: '初三',
          checked: false,
          value: 2,
          click: false
        },
        {
          class: '高一',
          checked: false,
          value: 3,
          click: false
        },
        {
          class: '高二',
          checked: false,
          value: 4,
          click: false
        },
        {
          class: '高三',
          checked: false,
          value: 5,
          click: false
        }],
      },
    ],
    time: [{
      name: '1个月',
      value: 1,
      checked: true
    },{
      name: '2个月',
      value: 2,
      checked: false
    },{
      name: '3个月',
      value: 3,
      checked: false
    },{
      name: '4个月',
      value: 4,
      checked: false
    },{
      name: '1学期',
      value: 5,
      checked: false
    }],
    eat: [{
      name: '含餐',
      value: 1,
      checked: true
    },{
      name: "不含餐",
      value: 0,
      checked: false
    }],
    visible1: false,
    visible2: false,
  },

  /**
   * 添加小孩信息
   */
  add_baby() {
    wx.navigateTo({
      url: '/pages/addbaby/addbaby?action=add'
    })
  },

  /**
   * 分割字符串
   */
  fileStr(){
    var student = this.data.value.student
    var list = student.split('，')
    var banji = this.data.tabs
    console.log(list)
    for(var i = 0; i < banji.length; i++){
      for(var n = 0; n < banji[i].child.length; n++){
        for(var m = 0; m < list.length; m++){
          if(banji[i].child[n].class === list[m]){
            banji[i].child[n].click = true
          }
          if(banji[i].child[n].class === list[0]){
            banji[i].child[n].checked = true
          }
        }
      }
    }
    this.setData({
      tabs: banji
    })
    
  },

  open1() {
    console.log("执行")
    this.setData({
      visible1: true,
    })
  },

  close1() {
    this.setData({
      visible1: false,
    })
  },

  onClose(key) {
    console.log('onClose')
    this.setData({
      [key]: false,
    })
  },

  phone() {
    wx.makePhoneCall({
      phoneNumber: '0734-8282553'
    })
  },

  onClose1() {
    this.onClose('visible1')
  },

  count(){
    var that = this
    var pay = that.data.value.pay
    var eatcost = that.data.value.eatcost
    var time = that.data.time
    var eat = that.data.eat
    var times = 0
    var eat_times = 0
    var safe = 5
    for(var i = 0; i < time.length; i++){
      if(time[i].checked===true){
        times = time[i].value
      }
    }
    pay = pay * times
    for(var i = 0; i < eat.length; i++){
      if(eat[i].checked===true){
        eat_times = eat[i].value
      }
    }
    eatcost = eat_times * eatcost * times
    safe = times * 5

    that.setData({
      pay: pay,
      eatcost: eatcost,
      safe: safe
    })
  },

  /**
   * 按钮点击变色
   */
  ChooseCheckbox(e) {
    console.log(e)
    var that = this
    let items = that.data.tabs;
    let values = e.currentTarget.dataset.value;
    var value = e.currentTarget.dataset.value.class
    for (var i = 0; i < items.length; i++){
      for(var n = 0; n < items[i].child.length; n++){
        if (items[i].child[n].class === value) {
          items[i].child[n].checked = true
        } else {
          items[i].child[n].checked = false
        }
      }
    }
    that.setData({
      tabs: items
    })
  },

  /**
   * 选择小孩信息按钮变色
   */
  ChooseBaby(e){
    var that = this
    var child = that.data.child
    var id = e.currentTarget.dataset.value.id
    for(var n = 0; n < child.length; n++){
      if(id == child[n].id){
        child[n].checked = true
      }else{
        child[n].checked = false
      }
      that.setData({
        child: child
      })
    }
  },

  /**
   * 按钮点击变色
   */
  ChooseTime(e){
    var that = this
    var time = that.data.time
    var name = e.currentTarget.dataset.value.name
    for(var i = 0; i < time.length; i++){
      if(name === time[i].name){
        time[i].checked = true
      }else{
        time[i].checked = false
      }
    }
    that.setData({
      time: time
    })
    that.count()
  },

  /**
   * 按钮变色
   */
  ChooseEat(e) {
    console.log(e)
    var that = this
    var eat = that.data.eat
    var name = e.currentTarget.dataset.value.name
    for (var i = 0; i < eat.length; i++) {
      if (name === eat[i].name) {
        eat[i].checked = true
      } else {
        eat[i].checked = false
      }
    }
    that.setData({
      eat: eat
    })
    that.count()
  },

  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 点击tab栏转换
   */
  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    var tabs = this.data.tabs
    for (var i = 0; i < tabs.length; i++) {
      if (i === index) {
        tabs[i].isShow = true
      } else {
        tabs[i].isShow = false
      }
    }
    this.setData({
      tabs: tabs,
    })
    console.log("值：", key, "索引：", this.data.anniu)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (app.globalData.userInfo){
      var nickName = app.globalData.userInfo.nickName
      wx.request({
        url: app.globalData.serverUrl + app.globalData.apiVersion + 'server/getchild?n=' + nickName,
        success(res){
          var child = res.data.data
          for (var n = 0; n < child.length; n++){
            child[n].checked = false
          }
          that.setData({
            child: child
          })
          console.log('获取小孩信息：', that.data.child)
        }
      })
    }
    
    console.log(nickName)
    var value = decodeURIComponent(options.value)
    var value = JSON.parse(value)
    console.log(value)
    that.setData({
      value: value
    })
    console.log(this.data.value.imagePath)
    that.count()
    that.fileStr()
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