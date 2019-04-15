// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
     name:'涂明栋',
     isRight:true,
    isWechat:false
  },
  getUserInfo(e){
    // debugger
       console.log('获取用户信息',e)
    if (e.detail.errMsg =='getUserInfo:ok'){ //成功授权
        //  隐藏授权按钮
       this.setData({
         isRight:false,
         isWechat:true
       })
    }

  },
  getPhoneNumber(e){

    console.log('手机号信息',e)
    if (e.detail.errMsg =='getPhoneNumber:fail user deny'){
       return
    }
    var that = this
    var url= app.globalData.url
   wx.request({
     url: app.globalData.url + '/dmi/weixinapi/wx-user-update.do?group=xcx',
    //  header: {
    //    // 'content-type': 'application/x-www-form-urlencoded', // 默认值
    //   //  'Accept': 'application/json',
    //    'Content-Type': 'text/plain'
    //   //  'Content-Type': 'json'

    //  },
    //  method: 'POST',
     data: {
       'data': JSON.stringify({
         encryptedData: e.detail.encryptedData,
         iv: e.detail.iv,
         token: app.globalData.token,
         name: this.data.name
       })
     },
     success(reponse){
      //  debugger
           if(reponse.data.code == 1){
                app.globalData.status = 1
             app.globalData.userId = JSON.parse(reponse.data.value).userid
            //  将userId 缓存起来
             wx.setStorage({
               key: 'userid',
               data: JSON.parse(reponse.data.value).userid
             })

             wx.request({
               url: app.globalData.url + '/dmi/weixinapi/getMyBaby.do',
               data: {

                 group: 'xcx',
                 userid: JSON.parse(reponse.data.value).userid

               },
               success: function (res) {
                 if (res.code == 1 && res.data.value) {

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
                     if (i == 0) {
                       obj.isChoose = 1
                     } else {
                       obj.isChoose = 0
                     }
                     babyList.push(obj)
                   }

                   app.globalData.babyList = babyList
                   app.globalData.babyId = babyList[0].id
                 } else if (res.code == 0) {
                   wx.showToast({
                     title: '获取数据失败！',
                   })
                 } else if (res.code == 2) { //尚未登录
                   app.globalData.status = 0
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
                 app.globalData.status = 1



               }
             })
             wx.showToast({
               title: '登录成功！',
             })
               setTimeout(function(){
                 wx.navigateBack({
                   delta: 1
                 })
               }, 1000)
           } else{
               wx.showToast({
                 title: '登录失败！',
               })
           }
     }
   }) 
   


   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //如果已经授权获取信息那么就不展示该按钮
    //  return
    
     const that = this
    wx.getSetting({
      success: (res) => {
        console.log('是否授权', res.authSetting['scope.userInfo']);
        if (!res.authSetting['scope.userInfo']){ //没有授权
              that.setData({
                isRight: true,
                isWechat: false
              })
        }else{
          that.setData({
            
            isRight: false,
            isWechat: true
          })
        }

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