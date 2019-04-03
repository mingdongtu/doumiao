// pages/inoculate/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        age: '11',
        content: [{
            viccine: 'A群流脑疫苗',
            count: 1,
            totalCount: 1,
            time: '2017-01-02'
          },
          {
            viccine: '感冒',
            count: 2,
            totalCount: 3,
            time: '2017-01-02',
            time: '2017-01-02'
          },
          {
            viccine: '埃博拉',
            count: 2,
            totalCount: 3,
            time: '2017-01-02'
          }
        ]
      },
      {
        age: '11',
        content: [{
          viccine: 'A群流脑疫苗',
          count: 1,
          totalCount: 1,
          time: '2017-01-02'
        },
        {
          viccine: '感冒',
          count: 2,
          totalCount: 3,
          time: '2017-01-02',
          time: '2017-01-02'
        },
        {
          viccine: '埃博拉',
          count: 2,
          totalCount: 3,
          time: '2017-01-02'
        }
        ]
      },
      {
        age: '11',
        content: [{
          viccine: 'A群流脑疫苗',
          count: 1,
          totalCount: 1,
          time: '2017-01-02'
        },
        {
          viccine: '感冒',
          count: 2,
          totalCount: 3,
          time: '2017-01-02',
          time: '2017-01-02'
        },
        {
          viccine: '埃博拉',
          count: 2,
          totalCount: 3,
          time: '2017-01-02'
        }
        ]
      }

    ]
  },
  onDetail(){
   wx.navigateTo({
     url: '/pages/inoculate/cinne/cinne',
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