// pages/detail/detail.js
var httpRequest = require("../../utils/util.js");
var utils = require("../../utils/util.js");
Page({
  data: {
    datas: {},
    replies: [],
    windowHeight: 0,
    hideLoading: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log("detail onLoad options:", options);
    if (options.topicId != null && options.topicId != "") {
      var topicId = options.topicId;
      this.getTopics(topicId);
      this.getReplies(topicId);
    }
  },
  onShow: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    });
    wx.setNavigationBarTitle({
      title: '主题详情',
    })
  },
  // 根据话题id获取相应的话题信息
  getTopics: function (topicId) {
    var that = this;
    httpRequest.request("https://www.v2ex.com/api/topics/show.json?id=" + topicId,topicId+"Topics", function (data) {
      console.log("getTopics data:", data);
      that.setData({
        datas: data[0]
      })
    }, function (reason) {
      console.log("getTopics reason:", reason);
    })
  },
  // 根据话题id获取相应的回复
  getReplies: function (topicId) {
    var that = this;
    httpRequest.request("https://www.v2ex.com/api/replies/show.json?topic_id=" + topicId,topicId+"Replies", function (data) {
      // console.log("getReplies data:", data);
      //遍历数组对象，将对象中的时间戳替换为指定格式的日期
      for (var i = 0; i < data.length; i++) {
        var created = data[i].created;
        var afterTranslateTime = utils.transLocalTime(created);
        var afterFormatTime = utils.formatTime(afterTranslateTime);
        data[i].created = afterFormatTime;
      }
      console.log("getReplies after data:", data);
      that.setData({
        replies: data,
        hideLoading: true
      })
    }, function (reason) {
      console.log("getReplies reason:", reason);
      // success
      that.setData({
        hideLoading: true
      })
    })
  },
  //跳转到相应的节点
  intent2Node: function (event) {
    console.log("intent2Node event:", event);
    var nodeId = event.currentTarget.id;
    var nodeName = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../node_detail/node_detail?nodeId=' + nodeId + "&nodeName=" + nodeName,
    })
  },
  //跳转到相应的用户
  intent2Member: function (event) {
    var userName = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../member/member?userName=' + userName,
    })
  }
})