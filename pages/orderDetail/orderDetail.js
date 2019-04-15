// pages/orderDetail/orderDetail.js
const app = getApp();
let globalMethod = require('../../method/method.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  deal(t1) {
    let t = new Date(t1);
    const year = t.getFullYear();
    const month = parseInt(t.getMonth()) < 10 ? 0 + '' + t.getMonth() : t.getMonth();
    const day = parseInt(t.getDate()) < 10 ? 0 + '' + t.getDate() : t.getDate()
    const hour = parseInt(t.getHours()) < 10 ? 0 + '' + t.getHours() : t.getHours()
    const minute = parseInt(t.getMinutes()) < 10 ? 0 + '' + t.getMinutes() : t.getMinutes()
    return year + '-' + month + '-' + day + '  ' + hour + ':' + minute

  },
  onLoad: function(options) {
    // const id = options.id;
    const id = '2ec5cde6-2a04-4f02-bbce-1b872cfc24a9'
    const that = this
    wx.request({
      url: app.globalData.url + '/dmi/weixinapi/getReservationInfo.do',
      data: {
        id: id,
        group: 'xcx'
      },
      success(res) {
        if (res.data.code == 1 && res.data.value) {
          let data = JSON.parse(res.data.value)
          console.log(data)
          let detail = {};
          detail.vaccineDate = that.deal(data.vaccineDate);
          detail.name = data.baby.name;
          detail.address = data.baby.address
          that.setData({
            detail: detail
          })
        }
        if(res.data.code == 0){
          wx.showToast({
            title: '获取数据失败',
          })
          return
        }
        if(res.data.code==2){
          globalMethod.method.noLogin(app)
        }

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