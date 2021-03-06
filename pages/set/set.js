// pages/set/set.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onAdvise() {
    wx.navigateTo({
      url: '/pages/advise/advise',
    })
  },
  onLogout(){
      wx.request({
        url: app.globalData.url + '/dmi/weixinapi/login-out.do',
        data:{
          group:'xcx',
          // userId:'26d544fb-b0ad-4c63-b2de-93c66ffab161'
          userid:app.globalData.userId
        },
        success(res){
            console.log(res)
            if(res.data.code==1){
              app.globalData.status = 0
              // 清除缓存
              wx.removeStorageSync('userid')
              app.globalData.userId = null;
              app.globalData.babyList = [];
              app.globalData.userId = null;
                wx.showToast({
                  title: '退出成功！'
                })
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  })     
                },1000)
            }
        }
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