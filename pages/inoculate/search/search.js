let globalMethod = require('../../../method/method.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    list: [

    ],
    pageNo: 1,
    pageCount: 1
  },
  onSearch() {
    wx.navigateTo({
      url: '/pages/inoculate/earch/earch'
    })
  },
  bindKeyInput(e){
  // debugger
  let name = e.detail.value
  this.setData({
       name:name
  })
  
  },
  onconfirm(){
    // debugger
    if (this.data.name =='') {
      wx.showToast({
        title: '内容不能为空',
      })
      return
    }
    this.getData(1, this.data.name)
  },
  
  dealTime(t1) {
    let t = new Date(t1);
    const year = t.getFullYear();
    const month = parseInt(t.getMonth()) < 10 ? 0 + '' + t.getMonth() : t.getMonth();
    const day = parseInt(t.getDate()) < 10 ? 0 + '' + t.getDate() : t.getDate()

    return year + '.' + month + '.' + day
  },
  onBottom() { //滚动到底部触发
    // debugger
    console.log('我到底部了')
    let pageNo = this.data.pageNo;
    if (pageNo < this.data.pageCount) { //
      pageNo = pageNo+1;
      this.setData({
        pageNo: pageNo
      })
      // 调用请求
      this.getData(pageNo)
    } else {
      wx.showToast({
        title: '没有更多内容了',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  getData(pageNo,name) {
    let that = this;
    let mylist = this.data.list
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let data = {
      userid: app.globalData.userId,
      // userid: 'befc5e09-4ce9-46f3-9bda-50350534ded2',
      babyId: app.globalData.babyId,
      // babyId: '3bf0c6f8-477b-4a49-80bd-ee4c341c5643',
      pageNo: pageNo,
      pageSize: 10,
      group: 'xcx'
    }
    if (name !='@#$%'){ //搜索
          data.name = name
    }
    wx.request({
      url: app.globalData.url + '/dmi/weixinapi/getVaccinePlanRecord.do',
      data: data,
      method:'POST',
      success(res) {
        // debugger
        wx.hideLoading()
        if (res.data.code == 1) {
          
          if (res.data.value == 'null') {
            wx.showToast({
              title: '没有数据',
            })
            return
          }
          let data = JSON.parse(res.data.value);
          that.setData({
            pageCount: data.pageCount
          })
          console.log(res, data)

          for (let i = 0; i < data.contents.length; i++) {
            let obj = {}
            obj.age = data.contents[i].baby.age;
            obj.time = that.dealTime(data.contents[i].clinicConfirmDate);
            obj.sick = data.contents[i].vaccine.name;
            obj.vaccine = data.contents[i].vaccine.name;
            obj.acount = 1;
            obj.totalAcount = 12
            mylist.push(obj)

          }
          that.setData({
            list: mylist
          })
        }
        if(res.data.code == 2){
          globalMethod.method.noLogin(app)
        }


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(this.data.pageNo,'@#$%')
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