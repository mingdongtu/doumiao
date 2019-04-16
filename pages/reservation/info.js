// pages/reservation/info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentid:"",
    item:{},
    button_status:"none",
    reservation_status:"block"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.currentid = options.id;
    if (wx.canIUse('showLoading')) {
      wx.showLoading({
        mask: true,
        title: '加载中...'
      })
    }
    var that = this;
    var userid = app.globalData.userId;
    wx.request({
      url: app.globalData.url + '/dmi/weixinapi/getReservationInfo.do?userId=' + userid + "&id=" + that.data.currentid+"&group=xcx",
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
          var button_status = getReservationButtonStatus(data.status);
          data.status = getReservationStatusName(data.status);
          that.setData({
            item: data,
            button_status: button_status
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
  onReservationConfirm:function(){
    var that = this;
    if (wx.canIUse('showLoading')) {
      wx.showLoading({
        mask: true,
        title: '提交中...'
      })
    }
    var that = this;
    var userid = app.globalData.userId;
    var paramData= {
      id: that.data.currentid,
      status:4
    }
    wx.request({
      url: app.globalData.url + "/dmi/vaccinevaccinationorder/vaccineVaccinationOrder-confirm.do?group=xcx",
      data: { "data": JSON.stringify(paramData)},
      success: function (res) {
        if (wx.canIUse('showLoading')) {
          wx.hideLoading();
        }
        if (res.data.code == 1) {
          if (res.data.value == "null") {
            return;
          }
          var button_status = getReservationButtonStatus(4);
          var data = that.data.item;
          data.status = getReservationStatusName(4);
          that.setData({
            item: data,
            button_status: button_status
          })
        } else {
          wx.showToast({
            title: '用户确认失败!',
            icon: 'succes',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: function () {
        // fail  
        wx.showToast({
          title: '用户确认失败!',
          icon: 'succes',
          duration: 2000,
          mask: true
        })
      },
      complete: function () {

      }
    })
  },
  onReservationCancel: function () {
    var that = this;
    if (wx.canIUse('showLoading')) {
      wx.showLoading({
        mask: true,
        title: '提交中...'
      })
    }
    var that = this;
    var userid = app.globalData.userId;
    var paramData = {
      id: that.data.currentid,
      status: 5
    }
    wx.request({
      url: app.globalData.url + "/dmi/vaccinevaccinationorder/vaccineVaccinationOrder-confirm.do?group=xcx",
      data: { "data": JSON.stringify(paramData) },
      success: function (res) {
        if (wx.canIUse('showLoading')) {
          wx.hideLoading();
        }
        if (res.data.code == 1) {
          if (res.data.value == "null") {
            return;
          }
          var button_status = getReservationButtonStatus(5);
          var data = that.data.item;
          data.status = getReservationStatusName(5);
          that.setData({
            item: data,
            button_status: button_status
          })
        } else {
          wx.showToast({
            title: '用户取消失败!',
            icon: 'succes',
            duration: 2000,
            mask: true
          })
        }
      },
      fail: function () {
        // fail  
        wx.showToast({
          title: '用户取消失败!',
          icon: 'succes',
          duration: 2000,
          mask: true
        })
      },
      complete: function () {

      }
    })
  },
})


function getReservationStatusName(status){
  var statusName = "";
  switch (status){
      case 1:
      statusName = "用户预约";
      break;
    case 2:
      statusName = "预约成功";
      break;
    case 3:
      statusName = "预约失败";
      break;
    case 4:
      statusName = "用户确认";
      break;
    case 5:
      statusName = "用户取消";
      break;
  }
  return statusName;
}


function getReservationButtonStatus(status) {
  var statusName = "none";
  switch (status) {
    case 1:
      statusName = "none";
      break;
    case 2:
      statusName = "block";
      break;
    case 3:
      statusName = "none";
      break;
    case 4:
      statusName = "none";
      break;
    case 5:
      statusName = "none";
      break;
  }
  return statusName;
}