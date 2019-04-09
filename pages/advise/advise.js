// pages/advise/advise.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    imageNum: 0,
    lastNum: 3,
    textContent: '',
    contact: '',
    warn: '',
    warn_1: '',
    isRight: true,
    warnMsg: '',
    warnMsg_contact: '',
    typeList: [{
      value: '功能异常',
      isChoose: ''
    }, {
      value: '界面异常',
      isChoose: ''
    }, {
      value: '其他',
      isChoose: ''
    }],
    type:'',
    tempFilePath: [] //图片路径
  },
  bindTextAreaBlur(e) {

  },
  onChoose(e) {
    const dex = e.currentTarget.dataset.dex;
    let typeList = this.data.typeList;
    for (let i = 0; i < typeList.length; i++) {
      if (dex == i) {
        typeList[i].isChoose = 'choose'
        this.setData({
          type: typeList[i].value
        })
      } else {
        typeList[i].isChoose = ''
      }
    }
    this.setData({
      typeList:typeList
    })
  },
  toUpload(path) {
    wx.uploadFile({ //上传图片到指定服务器
      url: app.globalData.url + '/dmi/imageUpload.do', // 仅为示例，非真实的接口地址
      filePath: path,
      name: 'files',
      header: {
        'Content-Type': 'multipart/form-data'
      },
      formData: {
        user: 'test'
      },
      success(res) {
        const data = res.data
      }
    })
  },
  onImport(e) {
    console.log(e)
    let value = e.detail.value;
    if (value.length > 139) {
      this.setData({
        warn: 'warn'
      })
    }
    this.setData({
      textContent: value
    })
  },
  onContact(e) {
    this.setData({
      contact: e.detail.value
    })
  },
  onDelete(e) {
    this.setData({
      warn_1: ''
    })
    const index = e.currentTarget.dataset.index;
    let imgList = this.data.imgList;
    imgList.splice(index, 1);
    this.setData({
      imgList: imgList
    })
  },

  onUpload() {
    const that = this;
    let imgList = this.data.imgList;
    if (imgList.length > 2) {
      wx.showModal({
        title: '提示',
        content: '最多只能上传三张照片',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }
    wx.chooseImage({
      success(res) {
        console.log('文件名', res)
        const tempFilePaths = res.tempFilePaths

        that.toUpload(tempFilePaths[0])
        imgList.push(tempFilePaths[0])
        if (imgList.length > 2) {
          that.setData({
            warn_1: 'warn_1'
          })
        }
        that.setData({
          imgList: imgList
        })

      }
    })
  },
  onSubmit() {
    // 校验：文本输入和联系方式
    const textContent = this.data.textContent;
    const contact = this.data.contact;
    console.log(contact)
    if (textContent.length == 0) {
      this.setData({
        warnMsg: '建议内容不能为空！',
        isRight: false
      })
      return
    } else {
      this.setData({
        warnMsg: '',
        isRight: true
      })
    }
    const reg_email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const reg_phone = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (contact != '') {
      // 不符合电话也不符合邮箱规则
      if (!reg_email.test(contact) && !reg_phone.test(contact)) {
        this.setData({
          warnMsg: '请输入正确的手机号或邮箱',
          isRight: false
        })
        return
      } else {
        this.setData({
          warnMsg: '',
          isRight: true
        })

      }
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