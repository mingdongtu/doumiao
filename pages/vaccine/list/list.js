// pages/vaccine/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],
     name:''
  },
  onBottom() {

  },
  bindKeyInput(e) {
    this.setData({
       name:e.detail.value
    })
  },
  
  onconfirm() {
     let param = {
        name:this.data.name
     }
     this.getData(param)
  },
  onChoose(e){
    // debugger
    const index = e.currentTarget.dataset.index;
    let list = this.data.list
    let obj = {
         name:list[index].name,
         id:list[index].id
    }
    app.globalData.vaccine = obj
    wx.navigateTo({
      url: '/pages/vaccine/orderRegister/orderRegister?vaccine='+JSON.stringify(obj),
    })
  },
  getData(param){
    const that = this;
    wx.request({
      url: app.globalData.url + '/dmi/vaccine/vaccine-page.do?group=xcx',
      data: param,
      success(res) {
        if (res.data.code != 1) {
          wx.showToast({
            title: '网络错误',
          })
          return
        }
        if (res.data.value) {
          let data = JSON.parse(res.data.value).contents;
          console.log('我的数据', data)
          that.setData({
            list: data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      this.getData({})
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