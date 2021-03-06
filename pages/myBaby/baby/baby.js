// pages/myBaby/baby/baby.js
let app = getApp();
let globalMethod = require('../../../method/method.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    babyList: []


  },
  addBaby() {
    wx.navigateTo({
      url: '/pages/addBaby/addBaby',
    })
  },
  onDelete(e) {
    // debugger
    const index = e.currentTarget.dataset.index;
    let babyList = this.data.babyList;
    const id = babyList[index].id
    const that = this
    wx.showModal({
      title: '提示',
      content: '是否删除?',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/dmi/baby/baby-remove.do?entity.id=' + id + '&group=' + 'xcx',

            success(res) {
              // 更新宝宝列表数据
              console.log(babyList)
              babyList.splice(index, 1)
              that.setData({
                babyList: babyList
              })
              console.log(babyList)
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1000
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  onBabyMsg(e) {
    const id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/myBaby/myBaby?id=' + id,
    })
  },
  getBabyData() {
    const that = this;
    wx.request({
      url: this.data.url + '/dmi/weixinapi/getMyBaby.do',
      data: {
        // userid: "befc5e09-4ce9-46f3-9bda-50350534ded2",
        userid: app.globalData.userId,
        group: 'xcx'
      },
      // method:'POST',
      success: function(res) {
        wx.hideLoading()
        if (res.data.code == 0) {
          wx.showToast({
            title: '获取数据失败',
          })
          return
        }
        if (res.data.code == 2) {
          globalMethod.method.noLogin(app)
        }
        const data = JSON.parse(res.data.value);
        if (data.length == 1 && JSON.stringify(data[0]) == '{}') {
          that.setData({
            babyList: []
          })
          return
        }
        // 对返回的数据进行处理
        let babyList = []
        console.log('宝宝数据',data)
        for (let i = 0; i < data.length; i++) {
          let obj = {};
          // debugger
          obj.imgsrc = '../../../images/bao.png';
          obj.isSpread = false;
          obj.edit = 'no_edit';
          obj.name = data[i].name;
          obj.height = data[i].height;
          obj.age = globalMethod.method.dealAge(data[i].birthDate);
          obj.weight = data[i].weight;
          obj.id = data[i].id;
          babyList.push(obj)
        }
        // debugger
        that.setData({
          babyList: babyList
        })



      }
    })
  },
  onEdit(e) {
    var index = e.currentTarget.dataset.index;
    var babyList = this.data.babyList
    console.log(babyList)
    for (var i = 0; i < babyList.length; i++) {
      if (i == index) {
        if (!babyList[i].isSpread) {
          babyList[i].edit = 'is_edit'
        } else {
          babyList[i].edit = 'no_edit'
        }
        babyList[i].isSpread = !babyList[i].isSpread
      }

    }
    this.setData({
      babyList: babyList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })

    this.getBabyData()
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
    this.getBabyData()
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