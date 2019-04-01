// pages/advise/advise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: []
  },
  bindTextAreaBlur(e) {

  },
  onUpload() {
    const that = this ;
    let imgList = this.data.imgList;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        // wx.uploadFile({ //上传图片到指定服务器
        //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     user: 'test'
        //   },
        //   success(res) {
        //     const data = res.data
        //     // do something
        //   }
        // })
        
        imgList.push(tempFilePaths[0])
 that.setData({
      imgList:imgList
 })
      }
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