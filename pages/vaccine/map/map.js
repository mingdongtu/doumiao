const app = getApp();
Page({
  data: {
    id:"",
    latitude: 0,
    longitude: 0,
    markers: [],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '../../../images/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '../../../images/location.png'
    }]
  },
  onLoad: function (options) {
    this.data.id = options.id;
    this.data.latitude = options.latitude;
    this.data.longitude = options.longitude;
  },
  onReady: function () {
    var id = this.data.id;
    var latitude = this.data.latitude;
    var longitude = this.data.longitude;
    this.mapCtx = wx.createMapContext('myMap');
    this.getNearByClinic();
    this.getCenterLocation();
    this.translateMarker(id, latitude, longitude);
    this.moveToLocation();
  },
  getCenterLocation: function () {
    var that = this;
    this.mapCtx.getCenterLocation({
      success: function (res) {
        that.setData({
          latitude:res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function (id, latitude, longitude) {
    this.mapCtx.translateMarker({
      markerId: id,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: latitude,
        longitude: longitude,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  },
  getNearByClinic:function(){
    var that = this;
    var longitude = this.data.longitude;
    var latitude  = this.data.latitude;
    wx.request({
      url: app.globalData.url + '/dmi/weixinapi/getNearByClinic.do?longitude=' + longitude + '&latitude=' + latitude+'&pageNo=1&pageSize=100&group=xcx',
      success(res) {
        if (res.data.code != 1) {
          wx.showToast({
            title: '网络错误',
          })
          return
        }
        if (res.data.value && res.data.value!="null") {
          let data = JSON.parse(res.data.value).contents;
          var array = new Array();
          for(var i=0;i<data.length;i++){
              var entity = data[i];
              var marker = {
                  id:entity.id,
                  title:entity.name,
                  longitude: entity.longitude,
                  latitude: entity.latitude
              }
            array.push(marker);
          }
          that.setData({
            markers: array
          })
        }
      }
    })
  }
})