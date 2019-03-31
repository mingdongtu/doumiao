// pages/myBaby/baby/baby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    babyList: [
      {
        imgsrc: '../../../images/bao.png',
        name: '罗饶启',
        age: '2岁2个月28天',
        isSpread: false,
        edit: 'no_edit'
      },
      {
        imgsrc: '../../../images/bao.png',
        name: '罗饶启',
        age: '2岁2个月28天',
        isSpread: false,
        edit: 'no_edit'
      },
      {
        imgsrc: '../../../images/bao.png',
        name: '罗饶启',
        age: '2岁2个月28天',
        isSpread: false,
        edit: 'no_edit'
      }

    ]

  },
  onBabyMsg(){
      wx.navigateTo({
        url: '/pages/myBaby/myBaby',
      })
  },
  onEdit(e) {
    var index = e.currentTarget.dataset.index;
    var babyList = this.data.babyList
    console.log(babyList)
    for (var i = 0; i < babyList.length; i++) {
      if(i==index){
        if (!babyList[i].isSpread) {
          babyList[i].edit = 'is_edit'
        } else {
          babyList[i].edit = 'no_edit'
        }
        babyList[i].isSpread = !babyList[i].isSpread
      }

    }
    this.setData({
      babyList: babyList
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