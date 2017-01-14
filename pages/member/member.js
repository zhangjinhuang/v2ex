// pages/member/member.js
var httpRequest = require("../../utils/util.js");
Page({
  data: {
    membersDetail: [],
    hideLoading:false,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.userName != null && options.userName != "") {
      var userName = options.userName;
      this.getMemberInfo(userName);
    }
  },
  getMemberInfo: function (userName) {
    var that = this;
    httpRequest.request("https://www.v2ex.com/api/topics/show.json?username=" + userName,userName+"Member", function (data) {
      console.log("getMemberInfo,data:", data);
      that.setData({
        membersDetail: data,
        hideLoading:true
      })
    }, function (reason) {
      console.log("getMemberInfo,reason:", reason);
    })
  },
  intentToDetail: function (event) {
    console.log("intentToDetail event:", event);
    var topicId = event.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?topicId=' + topicId,
    })
  },
})