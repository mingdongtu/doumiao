// pages/inoculate/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { age: '1周岁', time: '2019.03.04', sick: '麻风病', vaccine:'麻腮风疫苗',acount:'1',totalAcount:'1'},
      { age: '1周岁', time: '2019.03.04', sick: '麻风病', vaccine: '麻腮风疫苗', acount: '1', totalAcount: '1' },
      { age: '1周岁', time: '2019.03.04', sick: '麻风病', vaccine: '麻腮风疫苗', acount: '1', totalAcount: '1' },
      { age: '1周岁', time: '2019.03.04', sick: '麻风病', vaccine: '麻腮风疫苗', acount: '1', totalAcount: '1' },
      { age: '1周岁', time: '2019.03.04', sick: '麻风病', vaccine: '麻腮风疫苗', acount: '1', totalAcount: '1' },
      { age: '1周岁', time: '2019.03.04', sick: '麻风病', vaccine: '麻腮风疫苗', acount: '1', totalAcount: '1' }
    ]
  },
  onSearch(){
      wx.navigateTo({
        url: '/pages/inoculate/earch/earch',
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