// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     name:''
  },
  getPhoneNumber(e){

    console.log('手机号信息',e)
    var that = this
    var url= app.globalData.url
   wx.request({
     url: app.globalData.url + '/dmi/user/user-update.do',
     data:{
       group:'xcx',
       mobile: e.detail.encryptedData,
       name:that.data.name
     },
     success(reponse){
           if(reponse.code == 1){
                app.globalData.status = 1
                wx.navigateBack({
                  delta:1
                })
           } else{
               wx.showToast({
                 title: '登录失败！',
               })
           }
     }
   }) 
   


    // 快速登录
    // wx.login({
    //     success(res){
    //      if(res.code){
          
    //        wx.request({
    //          url: url + '/dmi/weixinapi/login.do',
    //          data: {
    //            encData: e.detail.encryptedData,
    //            iv: e.detail.iv,
    //            code:res.code
    //          },
    //          success(response) {
    //            const data = JSON.parse(res.data.value)
    //            if (data.code == 1) {
    //             //  登录成功将token存储起来
    //              app.globalData.token = response.data.session_key
    //              wx.navigateBack({
    //                delta: 1
    //              })
    //            }
    //          }
    //        })
    //      }
    //     }
    // })
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
        success: res => {
         
          this.setData({
            name: res.userInfo.nickName
          })
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

  }
})