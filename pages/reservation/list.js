// pages/reservation/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    pageNo:1,
    pageSize:10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    if (wx.canIUse('showLoading')) {
      wx.showLoading({
        mask: true,
        title: '加载中...'
      })
    }
    var that = this;
    var userid = app.globalData.userId;
    wx.request({
      url: app.globalData.url + '/dmi/weixinapi/getReservationRecord.do?userid=' + userid + "&pageNo=" + that.data.pageNo + "&pageSize=" + that.data.pageSize + "&group=xcx",
      data: {},
      method: 'GET',
      success: function (res) {
        if (wx.canIUse('showLoading')) {
          wx.hideLoading();
        }
        if (res.data.code == 1) {
          if (res.data.value == "null") {
            return;
          }
          const data = JSON.parse(res.data.value);
          const list = data.contents;
          that.setData({
            list: list
          })
        } else {
          wx.showToast({
            title: '加载数据失败!',
            icon: 'succes',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: function () {
        // fail  
        wx.showToast({
          title: '加载数据失败!',
          icon: 'succes',
          duration: 2000,
          mask: true
        })
      },
      complete: function () {

      }
    })
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

  },
  onReservationAdd:function(){
    wx.navigateTo({
      url: '/pages/vaccine/orderRegister/orderRegister'
    })
  },
  onReservatoinInfo:function(e){
    wx.navigateTo({
      url: '/pages/reservation/info?id=' + e.target.id
    })
  }
})