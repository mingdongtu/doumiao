let globalMethod = require('../../../method/method.js') ;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    pageCount: 1,
    list: [

    ]
  },
  onBottom() { //滚动到底部触发
    // return
    console.log('我到底部了')
    // debugger
    let pageNo = this.data.pageNo;
    if (pageNo < this.data.pageCount) { //
      pageNo = pageNo + 1;
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
  onDetail() {
    wx.navigateTo({
      url: '/pages/inoculate/cinne/cinne',
    })
  },
  getData(pageNo) {
    const that = this
    let mylist = this.data.list
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.url + '/dmi/weixinapi/getBabyVaccinationRecord.do',
      data: {
        babyId: app.globalData.babyId,
        // babyId: '3bf0c6f8-477b-4a49-80bd-ee4c341c5643',
        pageNo: pageNo,
        pageSize: 10,
        group: 'xcx'
      },
      method:'POST',
      success(res) {
        wx.hideLoading()
        // debugger
        if (res.data.code == 1) {
          if (res.data.value == 'null' ){
             wx.showToast({
               title: '没有数据',
             })
             return
          }
          let data = JSON.parse(res.data.value);
          console.log('接种记录数据', data)
          that.setData({
            pageCount: data.pageCount
          })
          for (let i = 0; i < data.contents.length; i++) {
            let obj = {}
            let age = globalMethod.method.dealAge(data.contents[i].group,1)

            if(age[0]>0){
                age = age[0]*12 + age[1]
            }else{
              age = age[1]==0?1:age[1]
            }
          
            obj.age = age;
            for (let j = 0; j < data.contents[i].list.length; j++) {
              data.contents[i].list[j].vaccinationDate = data.contents[i].list[j].vaccinationDate.slice(0, 10)
            }
            obj.content = data.contents[i].list
            mylist.push(obj)
          }
          that.setData({
            list: mylist
          })
        }
        if (res.data.code == 2) {
          globalMethod.method.noLogin(app)
        }
       

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取接种记录

    this.getData(this.data.pageNo)
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