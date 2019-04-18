// pages/vaccine/orderRegister/orderRegister.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    relations: ['父子', '父女', '母女', '母子'],
    sexs: ['男', '女'],
    babyList:['喜洋洋','美羊羊'],
    myList:[],
    babyIdx:0,
    idx: 0,
    index: 0,
    clinicConfirmDate: '2016-09-01',
    isChecked: true,
    contact: '',
    relationShip: '',
    notifyFlag: 1,
    isChoose: false,
    warnMsg: '',
    isWarn: false,
    myBaby:'',
    nowDate:'',
    vaccine:{
       name:''
    },
    hospital:{
       name:''
    }
  },
  onChoose() {
    this.setData({
      isChoose: !this.data.isChoose
    })
  },
  bindPickerChange(e) {
    this.setData({
      idx: e.detail.value,
      relationShip: this.data.relations[e.detail.value]
    })

  },
  onInput(e) {
    this.setData({
      // contact: this.data.babyList[this.data.babyIdx]
    })

  },
  bindBabyhange(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
     
      babyIdx: e.detail.value
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
  onChooseVaccine(){
    wx.redirectTo({
         url: "/pages/vaccine/list/list",
       })
  },
  onChooseHospital(){
    wx.redirectTo({
      url: "/pages/vaccine/hospital/hospital",
    })
  },
  onConfirm() { //确认预约
    //首先进行验证
    // debugger
    if (this.data.babyList[this.data.babyIdx].replace(/(^\s*)|(\s*$)/g, "") == '') {

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
        id: this.data.myList[this.data.babyIdx]
      };
      data.vaccine = {
        id: this.data.vaccine.id
      }
      data.clinic = {
        id: this.data.hospital.id
      }
      data.relationShip = this.data.relations[this.data.idx]
      data.clinicConfirmDate = this.data.clinicConfirmDate
      data.notifyFlag = this.data.notifyFlag
      data.notifyTime = this.data.clinicConfirmDate
      data.validFlag = 1
      data.contact = this.data.babyList[this.data.babyIdx]
      data.contactMobile = 12398436224
      data.vaccineDate = this.data.clinicConfirmDate
      data.userid = app.globalData.userId
      wx.request({
        url: app.globalData.url + '/dmi/vaccinevaccinationorder/vaccineVaccinationOrder-save.do',
        data:data,
        header: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain'
        },
        method: 'POST',

        success(res){
             console.log(res)
             if(res.data.code == 1){ //成功
               wx.showToast({
                 title: '预约成功',
                 icon: 'success',
                 duration: 1000
               })
               setTimeout(function(){
                   wx.redirectTo({
                     url: '/pages/reservation/list',
                   })
               },1000)
             }else{
               wx.showToast({
                 title: '预约失败',
                 icon: 'success',
                 duration: 1000
               })
             }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  // 首先判断是否有宝宝
  if(app.globalData.babyList.length==0){
    wx.showModal({
      title: '提示',
      content: '请先去添加宝宝',
      success(res) {
        if (res.confirm) {
         wx.navigateTo({
           url: '/pages/addBaby/addBaby',
         })
        } else if (res.cancel) {
            wx.navigateBack({
               delta:1
            })
        }
      }
    })
    return
  }


    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? 0 + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      nowDate: year + '-' + month + '-' + day
    })
    let babyList = app.globalData.babyList
    let list = []
    for (let i = 0; i < babyList.length;i++){
        list.push(babyList[i].name)
    }

    this.setData({
       babyList:list
    })
    // 判断是否来自选择疫苗页面
   
    if(app.globalData.vaccine){
      const vaccine = app.globalData.vaccine
      console.log('参数', vaccine)
      this.setData({
          vaccine:vaccine
      })
    }
    if (app.globalData.hospital) {
      const hospital = app.globalData.hospital
      console.log('参数', hospital)
      this.setData({
        hospital: hospital
      })
    }
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
    const that = this;
    wx.request({
      url: app.globalData.url + '/dmi/weixinapi/getMyBaby.do',
      data: {
        // userid: "befc5e09-4ce9-46f3-9bda-50350534ded2",
        userid: app.globalData.userId,
        group: 'xcx'
      },
      // method:'POST',
      success: function (res) {
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
        let myList= []
        for (let i = 0; i < data.length; i++) {
        
          babyList.push(data[i].name)
          myList.push(data[i].id)
        }
        // debugger
        that.setData({
          babyList: babyList,
          myList: myList
        })



      }
    })
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