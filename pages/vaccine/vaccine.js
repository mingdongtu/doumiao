// pages/vaccine/vaccine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_list:[
      { src: '../../images/9.png', value: '接种证', path:'/pages/inoculate/inoculate'},
      { src: '../../images/8.png', value: '疫苗预约', path: '/pages/reservation/list' },
      { src: '../../images/7.png', value: '疫苗快查', path:'/pages/vaccine/vaccineSearch/vaccineSearch' },
      { src: '../../images/6.png', value: '宝宝信息', path:'/pages/myBaby/baby/baby' }
    ],
    newsList:[
      { title_1: '宝宝的胃容量有限，宜少吃多餐', title_2: '多吃蔬菜水果', website: '育儿网', commentNum: '100', coverSrc:'../../images/10.jpg'},
      { title_1: '宝宝的胃容量有限，宜少吃多餐', title_2: '多吃蔬菜水果', website: '育儿网', commentNum: '100', coverSrc: '../../images/10.jpg' },
      { title_1: '宝宝的胃容量有限，宜少吃多餐', title_2: '多吃蔬菜水果', website: '育儿网', commentNum: '100', coverSrc: '../../images/10.jpg' },
      { title_1: '宝宝的胃容量有限，宜少吃多餐', title_2: '多吃蔬菜水果', website: '育儿网', commentNum: '100', coverSrc: '../../images/10.jpg' },
      { title_1: '宝宝的胃容量有限，宜少吃多餐', title_2: '多吃蔬菜水果', website: '育儿网', commentNum: '100', coverSrc: '../../images/10.jpg' },
      { title_1: '宝宝的胃容量有限，宜少吃多餐', title_2: '多吃蔬菜水果', website: '育儿网', commentNum: '100', coverSrc: '../../images/10.jpg' },
      { title_1: '宝宝的胃容量有限，宜少吃多餐', title_2: '多吃蔬菜水果', website: '育儿网', commentNum: '100', coverSrc: '../../images/10.jpg' },
      { title_1: '宝宝的胃容量有限，宜少吃多餐', title_2: '多吃蔬菜水果', website: '育儿网', commentNum: '100', coverSrc: '../../images/10.jpg' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onViccine(e){
    const path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path
    })
  },
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