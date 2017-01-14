// pages/latest/latest.js
var httpRequest = require("../../utils/util.js");
Page({
  data: {
    windowHeight: 0,
    hideLoadMore: true,
    hideLoading: false,
    datas: []
  },
  onLoad: function (options) {
    this.request();
  },
  request: function () {
    var that = this;
    // this.setData({
    //   hideLoading:false
    // })
    // 页面初始化 options为页面跳转所带来的参数
    httpRequest.request("https://www.v2ex.com/api/topics/latest.json","latest", function (data) {
      console.log("datas:", data);
      //停止下拉刷新
      wx.stopPullDownRefresh();
      that.setData({
        datas: data,
        hideLoading: true
      })
    }, function (reason) {
      console.log(reason);
      //停止下拉刷新
      wx.stopPullDownRefresh();
      that.setData({
        hideLoading: true
      })
    })
  },
  onShow: function () {
    // 页面显示
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // success
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },
  loadMore: function () {
    this.setData({
      hideLoadMore: false
    })
  },
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
    this.request();
  },
  intentToDetail: function (event) {
    console.log("intentToDetail event:", event);
    var topicId = event.currentTarget.id;
    wx.navigateTo({
      url: '../detail/detail?topicId=' + topicId,
    })
  },
  intent2Node: function (event) {
    console.log("intent2Node event:", event);
    var nodeId = event.currentTarget.id;
    var nodeName = event.currentTarget.dataset.value;
    console.log("nodeName=" + nodeName);
    wx.navigateTo({
      url: '../node_detail/node_detail?nodeId=' + nodeId + "&nodeName=" + nodeName,
    })
  },
  intent2Member: function (event) {
    var userName = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../member/member?userName=' + userName,
    })
  }
})