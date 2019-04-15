//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: '../../images/10.jpg',
      nickName: '未登录'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isLogin: false
  },
  //事件处理函数
  onLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  },
  onNotice() {
    wx.navigateTo({
      url: '/pages/notice/notice',
    })
  },
  onBaby() {
    wx.navigateTo({
      url: '../myBaby/baby/baby'
    })
  },
  onHospital() {
    wx.navigateTo({
      url: '/pages/vaccine/order/order'
    })
  },
  onOrder() {
    wx.navigateTo({
      url: '/pages/notice/notice'
    })
  },
  onSet() {
    wx.navigateTo({
      url: '/pages/set/set'
    })
  },
  onShow() {
    const that = this
    // debugger
    // 判断用户是否已经登录，如果没有登录则显示
    if (app.globalData.status == 1) { //处于登录状态
      wx.getUserInfo({
        success: res => {
          // debugger
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          that.setData({
            isLogin: true
          })
        }
      })
      // wx.getSetting({
      //     success(res) {
      //       // debugger
      //       if (!res.authSetting['scope.userInfo']) { //假如没有授权，就给予相应授权
      //         wx.authorize({
      //             scope: 'scope.userInfo',
      //             success: function() {
      //               wx.getUserInfo({
      //                   success: res => {
      //                     // debugger
      //                     app.globalData.userInfo = res.userInfo
      //                     this.setData({
      //                       userInfo: res.userInfo,
      //                       hasUserInfo: true
      //                     })
      //                     that.data.isLogin = true
      //                       }
      //                   })
      //               }
      //             })
      //         }
      //       }
      //     })
    }else{
        this.setData({
          userInfo: {
            avatarUrl: '../../images/10.jpg',
            nickName: '未登录'
          },
          isLogin:false
        })
    }
  },
  onLoad: function() {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }


  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})