
let method = {

  dealAge(t) {
    // const t = 1553749943000;
    // const t = 1470096000000;
    // const t = 1546300800000
    const nowTime = new Date().getTime();
    let babyAge = nowTime - t;
    const yearNum = 31536000000;
    const monthNum = 2592000000;
    const dayNum = 86400000;
    let year = '';
    let month = '';
    let day = '';
    const babyYear = babyAge / yearNum;
    const babyMonth = babyAge / monthNum;
    const babyDay = babyAge / dayNum;

    if (babyYear < 1) { //宝宝小于1岁
      if (babyMonth < 1) { //宝宝小于1个月
        year = 0;
        month = 0;
        day = parseInt(babyDay) + 1;
      } else {
        year = 0;
        month = parseInt(babyMonth);
        day = parseInt((babyMonth - month) * 30) + 1;
      }
    } else {
      year = parseInt(babyYear);
      if ((babyYear - year) * 12 < 1) { //月数小于1
        month = 0;
        day = parseInt((babyYear - year) * 365) + 1;
      } else {
        month = parseInt((babyYear - year) * 12);
        day = parseInt(babyDay - year * 365 - month * 30.42) + 1;
      }
    }

    return year + '岁' + month + '个月' + day + '天';

  },
   showLoading: function (msg) {
    wx.showLoading({
      title: msg,
      mask: true
    })
  },
  // 隐藏动画
  hideLoading: function (t) {
    setTimeout(function () {
      wx.hideLoading()
    }, t)
  }
}
module.exports = {
     method:method
}