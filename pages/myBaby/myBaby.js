// pages/myBaby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      babyList:[
          { type:'年龄',value:'1岁03月'},
        { type: '身高', value: '60cm' },
        { type: '体重', value: '10kg' },
        { type: '饮食', value: '已断奶' }
      ]
  },
  addBaby(){
       wx.navigateTo({
         url: '../addBaby/addBaby'
       })
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