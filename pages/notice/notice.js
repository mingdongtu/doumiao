// pages/notice/notice.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticeList: null
  },
  onDetail(e) {
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?id=' + e.currentTarget.dataset.id
    })
  },
  dealTime(t) {
    // let t = '2019-03-28 22:26:41';
    // debugger
    let t1 = t.slice(0, 10).split('-')
    let t2 = t.slice(-8).split(':');

    if (parseInt(t2[0]) < 12) { //上午
      return (t1[0] + '年' + t1[1] + '月' + t1[2] + '日上午' + t.slice(-8, -3));
    } else if (parseInt(t2[0]) == 12) { //中午
      return (t1[0] + '年' + t1[1] + '月' + t1[2] + '日中午' + t.slice(-8, -3));
    } else { // 下午
      return (t1[0] + '年' + t1[1] + '月' + t1[2] + '日下午' + t.slice(-8, -3));
    }
    console.log(t1[0] + '年' + t1[1] + '月' + t1[2] + '日下午' + t.slice(-8, -3))
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    const data = {
      group: "xcx",
      baby: {
        name: "baby",
        user: {
          name: "test4",
          mobile: "123545"
        }
      },
      clinic: {
        name: "方大城"
      },
      vaccine: {
        name: "baby"
      },
      clinicConfirmStartDate: "2019-01-01",
      ClinicConfirmEndDate: "2019-04-01",
      notifyTimeStartDate: "2019-01-01",
      notifyTimeEndDate: "2019-04-01",
      vaccineStartDate: "2019-01-01",
      vaccineEndDate: "2019-04-01",
      contact: "联系人",
      contactMobile: "16489"
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.url + '/dmi/vaccinevaccinationorder/vaccineVaccinationOrder-page.do',
      data: data,
      success(res) {
        wx.hideLoading()

        if (res.data.code==0){
            wx.showToast({
              title: '获取数据失败',
            })
            return
        }
        let data = JSON.parse(res.data.value).contents
        console.log(data)
        // debugger
        let noticeList = []
        for (let i = 0; i < data.length; i++) {

          let obj = {}
          obj.modifyDate = that.dealTime(data[i].baby.modifyDate)
          obj.address = data[i].baby.address;
          obj.id = data[i].baby.id;
          noticeList.push(obj)


        }

        that.setData({
          noticeList: noticeList
        })
      
        console.log(that.data.noticeList)
        // debugger
      }


    })
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