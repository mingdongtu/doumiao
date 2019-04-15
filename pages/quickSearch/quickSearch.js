// pages/quickSearch/quickSearch.js
const app = getApp();
const globalMethod = require('../../method/method.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vaccine:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     const that = this ;
     let list = [];
    wx.request({
      url: app.globalData.url + '/dmi/vaccine/vaccine-page.do',
      data: options.data,
      success(res) {
        
        if (res.data.code == 1 && res.data.value) {
          let data = JSON.parse(res.data.value).contents
          console.log('搜索结果', data)
          for(let i=0;i<data.length;i++){
              let obj = {};
            obj.batchNo = data[i].batchNo
            obj.company = data[i].company
            obj.name = data[i].name;
            list.push(obj)
          }
          that.setData({
            vaccine:list
          })
        }
        if (res.data.code == 2) {
          globalMethod.method.noLogin(app)
        }
        if (res.data.code == 0) { //错误

        }
      }
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
  onShareAppMessage: function () {

  }
})