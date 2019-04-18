// pages/inoculate/inoculate‘.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baby: [],
    customItem: '金刚葫芦娃',
    index: 0
  },
  bindRegionChange(e) {
    this.setData({
      index: e.detail.value
    })
    let babyList = app.globalData.babyList;
    app.globalData.babyId = babyList[e.detail.value].id
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onInculate() {
    wx.navigateTo({
      url: '/pages/inoculate/search/search'
    })
  },
  onRecord() {
    // 判断宝宝是否为空
    if (app.globalData.babyId == '') {
      wx.showModal({
        title: '提示',
        content: '请先添加宝宝',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/addBaby/addBaby',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: '/pages/inoculate/record/record'
    })
  },
  onLoad: function(options) {

    const that = this;

    wx.request({
      url: app.globalData.url + '/dmi/weixinapi/getMyBaby.do',
      data: {

        group: 'xcx',
        userid: app.globalData.userId

      },
      success: function(res) {
        if (res.data.code == 1 && res.data.value) {
          // debugger
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


          //  对数据进行处理
          //  获取全局的宝宝信息
          // debugger
          let myList = app.globalData.babyList;
          let list = [];
          for (let i = 0; i < myList.length; i++) {
            list.push(myList[i].name)
          }
          that.setData({
            baby: list
          })


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