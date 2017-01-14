// pages/node/node.js
var httpRequest = require("../../utils/util.js");
Page({
  data: {
    allNodes: [],
    hideLoading: false,
    hideLoadMore: true,
    windowHeight: 0
  },
  onLoad: function (options) {
    this.request();
  },
  request: function () {
    var that = this;
    // this.setData({
    //   hideLoading: false
    // })
    httpRequest.request("https://www.v2ex.com/api/nodes/all.json","allNode", function (data) {
      //停止下拉刷新
      wx.stopPullDownRefresh();
      console.log("onLoad:success:data:", data);
      that.setData({
        allNodes: data,
        hideLoading: true
      })
    }, function (reason) {
      //停止下拉刷新
      wx.stopPullDownRefresh();
      console.log("reason", reason);
      that.setData({
        hideLoading: true
      })
    })
  },
  onShow: function () {
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
  intent2Node: function (event) {
    var nodeId = event.currentTarget.id;
    var nodeName = event.currentTarget.dataset.value;
    wx.navigateTo({
      url: '../node_detail/node_detail?nodeId=' + nodeId + "&nodeName=" + nodeName,
    })
  }
})