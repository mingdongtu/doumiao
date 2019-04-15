//app.js
App({
  onLaunch: function() {
    const that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  //  判断userid缓存是否存在
    const userid = wx.getStorageSync('userid')
    if(userid){
      this.globalData.userId = userid
      that.globalData.status = 1
         return 
    }
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        // return
        wx.request({
          url: that.globalData.url + '/dmi/weixinapi/login.do',
          data: {
            group: 'xcx',
            code: res.code
          },
          header: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain'
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
          // method:'POST',
          success(response) {
            // debugger
            console.log('我的登录信息', response)
            if (response.data.code ==0){
                wx.showToast({
                  title: '网络错误',
                })
                return
            }
            const data_1 = JSON.parse(response.data.value)
            // debugger
            // that.globalData.userId = data_1.userId
            that.globalData.status = data_1.status 
            //判断当前用户的的登录状态       
               that.globalData.token = data_1.token
            if (data_1.status==0){ //用户尚未登录跳转到登录页面  
              wx.showModal({
                title: '提示',
                content: '当前用户尚未登录',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })
                  } else if (res.cancel) {

                  }
                }
              })
              return
            }
            // return
         




          }
        })
      }
    })
    // 获取用户信息

   
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    // 获取所有宝宝的id列表，并且默认第一个是当前宝宝，将排序存储起来



  },
  globalData: {
    userInfo: null,
    url: 'https://www.hongfu951.com',
    babyList: [],
    babyId: '',
    token: null,
    status: 0, //存储登录状态
    userId: null
  }
})