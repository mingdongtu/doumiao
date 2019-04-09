// pages/inoculate/record/record.js
const app = getApp()
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
        // babyId: app.globalData.babyId,
        babyId: '3bf0c6f8-477b-4a49-80bd-ee4c341c5643',
        pageNo: pageNo,
        pageSize: 10,
        group: 'xcx'
      },
      success(res) {
        let data = JSON.parse(res.data.value);
        console.log('接种记录数据',data)
        that.setData({
          pageCount: data.pageCount
        })
     
       
        for (let i = 0; i < data.contents.length; i++) {
          let obj = {}
          obj.age = data.contents[i].group;
          for (let j = 0; j < data.contents[i].list.length;j++){
            data.contents[i].list[j].vaccinationDate = data.contents[i].list[j].vaccinationDate.slice(0,10)
          }
          obj.content = data.contents[i].list
          // debugger
          // let obj_1 = {}
          // obj_1.viccine = data.contents[i].vaccine.name;
          // obj_1.count = 1;
          // obj_1.totalCount = 20;

          // obj.content.push(obj_1)
          mylist.push(obj)
        }
        that.setData({
          list: mylist
        })
        wx.hideLoading()

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