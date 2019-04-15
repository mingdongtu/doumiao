// pages/inoculate/inoculate‘.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baby: [],
    customItem:'金刚葫芦娃',
    index:0
  },
  bindRegionChange(e){
    this.setData({
      index: e.detail.value
    })
    let babyList = app.globalData.babyList;
    app.globalData.babyId = babyList[e.detail.value].id
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onInculate(){
    wx.navigateTo({
      url: '/pages/inoculate/search/search'
    })
  },
  onRecord(){
    // 判断宝宝是否为空
    if (app.globalData.babyId==''){
      wx.showModal({
        title: '提示',
        content: '请先添加宝宝',
        success(res) {
          if (res.confirm) {
             wx.navigateTo({
               url: '/pages/addBaby/addBaby',
             })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/inoculate/record/record'
    })
  },
  onLoad: function (options) {
    //  获取全局的宝宝信息
    let babyList = app.globalData.babyList;
    let list = [];
    for (let i =0;i<babyList.length;i++){
         list.push(babyList[i].name)
    }
    this.setData({
       baby:list
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