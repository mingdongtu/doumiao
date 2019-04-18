// pages/myBaby.js
const app = getApp();
let globalMethod = require('../../method/method.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    baby:{
        age:'',
        height:'',
        weight:'',
        food:''
    },
    babyList: [{
        type: '年龄',
        value: '1岁03月'
      },
      {
        type: '身高',
        value: '60cm'
      },
      {
        type: '体重',
        value: '10kg'
      },
      {
        type: '饮食',
        value: '已断奶'
      }
    ]
  },
  addBaby() {
    wx.navigateTo({
      url: '../addBaby/addBaby'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   const _self = this;
    wx.request({
      url: this.data.url + '/dmi/weixinapi/getMyBabyInfo.do',
      data: {
        babyId: options.id,
        group: 'xcx'
      },
      success(res) {
        let data = JSON.parse(res.data.value)
        console.log(data)
        // 对数据进行处理
        let obj = {};
        data.age = globalMethod.method.dealAge(data.birthDate)
        _self.setData({
           baby:data
        }) 
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})