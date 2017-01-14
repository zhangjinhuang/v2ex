function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();

  //获取当前时间
  var time = new Date();
  var currentYear = time.getFullYear();
  var currentMonth = time.getMonth() + 1;
  var currentDay = time.getDate();
  var currentHour = time.getHours()
  var currentMinute = time.getMinutes()
  var currentSecond = time.getSeconds();
  //判断是否在同一天
  if (year === currentYear && month === currentMonth && day === currentDay) {
    if (hour > 0)
      return [hour, minute].map(formatNumber).join(":");
    if (minute < 2)
      return "刚刚";
    if (minute > 30)
      return "半个小时以前";
    return minute + "分钟前";
  }

  var offsetTime = time.getTime() - date.getTime();
  var days = Math.round(offsetTime / 86400000);
  if (days === 1)
    return "昨天 " + [hour, minute].map(formatNumber).join(":");
  if (days === 2)
    return "前天 " + [hour, minute].map(formatNumber).join(":");
  if (days <= 7)
    return days + "天前";

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function transLocalTime(t) {
  return new Date(t * 1000);
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 请求数据
function request(url,cacheKey, success, failure) {
  if (typeof url == null || typeof url == "" || typeof success != 'function' || typeof failure != 'function')
    return;

  //获取缓存的时间
  wx.getStorage({
    key: cacheKey+'CacheTime',
    success: function (res) {
      // success
      var cacheTime = res.data;
      console.log("getStorage cacheTime:", cacheTime);
      //获取当前时间
      var time = new Date();
      var offsetTime = time.getTime() - cacheTime.getTime();
      console.log("offsetTime:", offsetTime);
      //判断缓存时间是否超过5分钟，如果是的话则重新请求接口
      if (offsetTime < 5*60 * 1000) {
        // console.log("从缓存获取数据：");
        //根据指定的key从缓存中获取数据
        wx.getStorage({
          key: cacheKey+"Datas",
          success: function (res) {
            // success
            // console.log("从缓存获取数据：success");
            success(res.data);
          },
          fail: function () {
            // console.log("从缓存获取数据：fail");
            // fail缓存中不存在相应数据的话，则请求接口获取
            getData(url, cacheKey, success, failure)
          }

        })

      } else {
        // console.log("success 从接口获取数据：");
        getData(url, cacheKey, success, failure)
      }

    },
    fail: function () {
      // fail
      // console.log("fail 从接口获取数据：");
      getData(url, cacheKey, success, failure)
    },
  })


}
// 获取数据
function getData(url, cacheKey, success, failure) {
  wx.request({
    url: url,
    success: function (res) {
      // success
      if (res.statusCode == 200) {
        //保存需要缓存的数据
        wx.setStorage({
          key: cacheKey+"Datas",
          data: res.data,
        })
        //缓存获取接口的时间
        wx.setStorage({
          key: cacheKey+'CacheTime',
          data: new Date(),
        })

        success(res.data);
      } else {
        failure("请求失败");
      }
    },
    fail: function () {
      // fail
      failure("请求失败");
    },
    complete: function () {
      // complete
    }
  })
}


module.exports = {
  request: request,
  formatTime: formatTime,
  transLocalTime: transLocalTime
}
