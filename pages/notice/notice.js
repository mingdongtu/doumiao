// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   noticeList :[
      {
       time:'2019年3月1日 上午9:00',
       content:'你的宝宝于2019年下午3:00预约南山医院接种疫苗，点击查看详情'
      },
     {
       time: '2019年3月1日 上午9:00',
       content: '你的宝宝于2019年下午3:00预约南山医院接种疫苗，点击查看详情'
     },
     {
       time: '2019年3月1日 上午9:00',
       content: '你的宝宝于2019年下午3:00预约南山医院接种疫苗，点击查看详情'
     },
     {
       time: '2019年3月1日 上午9:00',
       content: '你的宝宝于2019年下午3:00预约南山医院接种疫苗，点击查看详情'
     },
     {
       time: '2019年3月1日 上午9:00',
       content: '你的宝宝于2019年下午3:00预约南山医院接种疫苗，点击查看详情'
     },
     {
       time: '2019年3月1日 上午9:00',
       content: '你的宝宝于2019年下午3:00预约南山医院接种疫苗，点击查看详情'
     },
     {
       time: '2019年3月1日 上午9:00',
       content: '你的宝宝于2019年下午3:00预约南山医院接种疫苗，点击查看详情'
     },
     {
       time: '2019年3月1日 上午9:00',
       content: '你的宝宝于2019年下午3:00预约南山医院接种疫苗，点击查看详情'
     },
     {
       time: '2019年3月1日 上午9:00',
       content: '你的宝宝于2019年下午3:00预约南山医院接种疫苗，点击查看详情'
     }
   ]
  },
  onDetail(){
       wx.navigateTo({
         url: '/pages/orderDetail/orderDetail'
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