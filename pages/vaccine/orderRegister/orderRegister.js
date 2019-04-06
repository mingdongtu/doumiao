// pages/vaccine/orderRegister/orderRegister.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    relations: ['父子', '父女', '母女', '母子'],
    sexs: ['男', '女'],
    idx: 0,
    index: 0,
    clinicConfirmDate: '2016-09-01',
    isChecked: true,
    contact: '',
    relationShip: '',
    notifyFlag: 1,
    isChoose: false,
    warnMsg: '',
    isWarn: false
  },
  onChoose() {
    this.setData({
      isChoose: !this.data.isChoose
    })
  },
  bindPickerChange(e) {
    this.setData({
      idx: e.detail.value,
      relationShip: relations[e.detail.value]
    })

  },
  onInput(e) {
    this.setData({
      contact: e.detail.value
    })

  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      clinicConfirmDate: e.detail.value
    })
  },
  bindSexChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
    if (sexs[e.detail.value] == '男') {
      this.setData({
        notifyFlag: 1
      })
    } else {
      this.setData({
        notifyFlag: 0
      })
    }
  },
  radioChange(e) {
    console.log(e)
    this.isChecked = !this.isChecked

  },
  onConfirm() { //确认预约
    //首先进行验证
    // debugger
    if (this.data.contact.replace(/(^\s*)|(\s*$)/g, "") == '') {

      this.setData({
        warnMsg: '宝宝姓名不能为空！',
        isWarn: true
      })
      return
    } else {

      this.setData({
        warnMsg: '',
        isWarn: false
      })
    }
    // 验证时间
    const t = new Date().getTime();
    const t1 = new Date(this.data.clinicConfirmDate).getTime();
    if ((t - t1) / (24 * 3600 * 1000) < 30) {
      this.setData({
        warnMsg: '宝宝必须大于30天方可接种疫苗！',
        isWarn: true
      })
      return
    } else {
      this.setData({
        warnMsg: '',
        isWarn: false
      })
    }
    if (!this.data.isChoose) {
      wx.showModal({
        title: '提示',
        content: '请先同意服务协议',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })

    } else {
      //调用请求
      let data = {}
      data.group = "xcx";
      data.baby = {
        id: '3bf0c6f8-477b-4a49-80bd-ee4c341c5643'
      };
      data.vaccine = {
        id: "ec9ef102-e273-4686-8338-2add7c69356b"
      }
      data.clinic = {
        id: "35f57e93-1ae0-4195-9df3-ea75064bfb50"
      }
      data.relationShip = this.data.relationShip
      data.clinicConfirmDate = this.data.clinicConfirmDate
      data.notifyFlag = this.data.notifyFlag
      data.notifyTime = this.data.clinicConfirmDate
      data.validFlag = 1
      data.contact = this.data.contact
      data.contactMobile = 12398436224
      data.vaccineDate = this.data.clinicConfirmDate
      wx.request({
        url: app.globalData.url + '/dmi/vaccinevaccinationorder/vaccineVaccinationOrder-save.do',
        data:data,
        success(res){
            
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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