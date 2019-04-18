// pages/vaccine/order/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     orderList:[],
     id:"",
     latitude:0,
     longitude:0
  },
  onMap(e){
    console.log(e);
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
     wx.navigateTo({
       url: '/pages/vaccine/map/map?id=' + e.target.id + "&latitude=" + latitude + "&longitude=" + longitude,
     })  
  },
  onCall(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel  // 仅为示例，并非真实的电话号码
    })
  },
  onRegister(){
    wx.navigateTo({
      url: '/pages/vaccine/orderRegister/orderRegister',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onloadNearClinicData();
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

  },
  onloadNearClinicData:function(){
    var that = this;
    
    wx.getSetting({
      success(res) {
        // debugger
        if (res.authSetting['scope.userInfo']) {
          wx.getLocation({
            type: 'gcj02',
            success(res) {
              const latitude = res.latitude;
              const longitude = res.longitude;
              that.setData({
                latitude: latitude,
                longitude: longitude
              });
              wx.request({
                url: app.globalData.url + '/dmi/weixinapi/getNearByClinic.do?longitude=' + longitude + '&latitude=' + latitude + '&pageNo=1&pageSize=100&group=xcx',
                success(res) {
                  if (res.data.code != 1) {
                    wx.showToast({
                      title: '网络错误',
                    })
                    return
                  }
                  if (res.data.value && res.data.value != "null") {
                    let data = JSON.parse(res.data.value).contents;
                    that.setData({
                      orderList: data
                    })
                  }
                }
              })
            }
          })
        }
      }
    })
  }
})