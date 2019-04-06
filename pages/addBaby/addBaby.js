// pages/addBaby.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    relations: ['父女', '母女', '爷爷', '奶奶', '阿姨', '叔叔', '外公', '外婆'],
    sexs:['男','女'],
    realation:'父女',
    sex:'男',
    idx: 0,
    nowIndex:0,
    code:'',
    clinicConfirmDate: '2016-09-01',
    height: '',
    weight: '',
    eat: '',
    name:'',
    isWarn:false
  },
  onAdd(){
      let data = {
        name:this.data.name,
        birthDate:this.data.clinicConfirmDate,
        sex:this.data.sex,
        weight:this.data.weight,
        height:this.data.height,
        group:'xcx',
        user:{
          id:'befc5e09-4ce9-46f3-9bda-50350534ded2'
        },
        // code:this.data.code //儿童编码 
        // realation:this.data.relation,//与宝宝关系
        diet:this.data.eat //饮食

      }

      // 提前进行验证
    if (this.data.name == '' || this.data.weight == '' || this.data.height == '' || this.data.eat == '' ){
        this.setData({
            isWarn:true
        })
        return
    }else{
      this.setData({
        isWarn: false
      })
    }
      wx.request({
        url: app.globalData.url + '/dmi/baby/baby-save.do',
        data:data,
        success(res){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onName(e){
    this.setData({
      name: e.detail.value
    })
  },
  onCode(e){
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
  bindSexChange(e){
    this.setData({
      nowIndex: e.detail.value,
      sex: this.data.relations[e.detail.value]
    })
  },
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