//app.js
App({
  onLaunch: function () {
    const that = this ;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log(res)
      // return
        wx.request({
          url: that.globalData.url + '/dmi/weixinapi/login.do',
          data:{
            group:'xcx',
            code:res.code
          },
          success(response){
            console.log('我的登录信息', response) 
            const data = JSON.parse(response.data.value)
            that.globalData.userId = data.userId
            that.globalData.status = data.status  //判断当前用户的的登录状态
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
  
    wx.request({
      url: that.globalData.url + '/dmi/weixinapi/getMyBaby.do',
      data: {
        userId: "befc5e09-4ce9-46f3-9bda-50350534ded2",
        group: 'xcx'
      },
      success: function (res) {
        const data = JSON.parse(res.data.value);
        // 对返回的数据进行处理
        let babyList = []
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          // debugger
          obj.imgsrc = '../../../images/bao.png';
          obj.isSpread = false;
          obj.edit = 'no_edit';
          obj.name = data[i].name;
          obj.height = data[i].height;
          // obj.age = globalMethod.method.dealAge(data[i].birthDate);
          obj.weight = data[i].weight;
          obj.id = data[i].id;
          if(i==0){
             obj.isChoose = 1
          }else{
            obj.isChoose = 0
          }
          babyList.push(obj)
        }

       that.globalData.babyList = babyList
      that.globalData.babyId = babyList[0].id

      }
    })

  },
  globalData: {
    userInfo: null,
    url:'http://www.hongfu951.com',
    babyList:[],
    babyId:'',
    token:null,
    status:0,
    userId:null
  }
})