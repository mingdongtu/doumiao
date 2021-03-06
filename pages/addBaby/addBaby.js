// pages/addBaby.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    relations: ['父子', '父女', , '母女', '母子'],
    sexs: ['男', '女'],
    realation: '父女',
    sex: '男',
    idx: 0,
    nowIndex: 0,
    code: '',
    clinicConfirmDate: '2016-09-01',
    height: '',
    weight: '',
    eat: '',
    name: '',
    isWarn: false,
    nowDate: ''
  },
  onScan() {
    const that = this;
    wx.scanCode({
      success(res) {
        console.log(res)
        that.setData({
          code: res.result
        })
      }
    })
  },
  onAdd() {
    let data = {
      name: this.data.name,
      birthDate: this.data.clinicConfirmDate,
      sex: this.data.sex == '男' ? 1 : 2,
      weight: this.data.weight,
      height: this.data.height,
      group: 'xcx',
      user: {
        id: app.globalData.userId
      },
      // code:this.data.code //儿童编码 
      // realation:this.data.relation,//与宝宝关系
      diet: this.data.eat //饮食

    }

    // 提前进行验证
    if (this.data.name == '' || this.data.weight == '' || this.data.height == '' || this.data.eat == '') {
      this.setData({
        isWarn: true
      })
      return
    } else {
      this.setData({
        isWarn: false
      })
    }
    wx.request({
      url: app.globalData.url + '/dmi/baby/baby-save.do',
      data: {
        'data': JSON.stringify(data)
      },
      // header: {
      //   // 'content-type': 'application/x-www-form-urlencoded', // 默认值
      //   'Accept': 'application/json',
      //   'Content-Type': 'text/plain'

      // },
      // method: 'POST',
      success(res) {
        if (res.data.code == 0) {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: true,
            success(res) {
              if (res.confirm) {

              }
            }
          })

          return
        }
        wx.showToast({
          title: '添加成功',
        })
        setTimeout(function() {
           wx.navigateBack({
                delta:1
           })
          // wx.redirectTo({
          //   url: '/pages/myBaby/baby/baby',
          // })
        }, 1000)

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  onCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  onWeight(e) {
    this.setData({
      weight: e.detail.value
    })
  },
  onHeight(e) {
    this.setData({
      height: e.detail.value
    })
  },
  onEat(e) {
    this.setData({
      eat: e.detail.value
    })
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      clinicConfirmDate: e.detail.value
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      idx: e.detail.value,
      realation: this.data.relations[e.detail.value]
    })

  },
  bindSexChange(e) {
    this.setData({
      nowIndex: e.detail.value,
      sex: this.data.relations[e.detail.value]
    })
  },
  onLoad: function(options) {
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? 0 + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      nowDate: year + '-' + month + '-' + day
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