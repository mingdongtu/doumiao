// pages/vaccine/vaccineSearch/vaccineSearch.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companys: ['苹果', '华为', '大疆', '阿里巴巴'],
    idx: 0,
    name: '',
    order: '',
    company: ''
  },

  bindPickerChange(e) {
    this.setData({
      idx: e.detail.value
    })
  },
  onName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  onOrder(e) {
    this.setData({
      order: e.detail.value
    })
  },
  onCompany(e) {
    this.setData({
      company: e.detail.value
    })
  },
  onSearch(){
      const data = {
        group:'xcx',
        name:this.data.name,
        batchNo:this.data.order,
        company:this.data.company
      }
      wx.request({
        url: app.globalData.url + '/dmi/vaccine/vaccine-page.do',
        data:data,
        success(res){
           console.log('搜索结果',res)
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {

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