// pages/node_detail/node_detail.js
var httpRequest = require("../../utils/util.js");
Page({
  data: {
    nodesDetail: [],
    hideLoading:false
  },
  onLoad: function (options) {
    console.log("onLoad:options=", options);
    // 页面初始化 options为页面跳转所带来的参数
    if (options.nodeId != null && options.nodeId != "") {
      var nodeId = options.nodeId;
      //获取相应节点的信息
      this.getNodeByNodeId(nodeId);
      //设置当前页的标题
      var nodeName = options.nodeName;
      if (nodeName != null && nodeName != "") {
        wx.setNavigationBarTitle({
          title: nodeName,
        })
      }
    }
  },
  getNodeByNodeId: function (nodeId) {
    var that = this;
    httpRequest.request("https://www.v2ex.com/api/topics/show.json?node_id=" + nodeId,nodeId+"NodeDetail", function (data) {
      console.log("getNodeByNodeId:data=", data);
      that.setData({
        nodesDetail: data,
        hideLoading:true
      })
    }, function (reason) {
      console.log("getNodeByNodeId:reason=", reason);
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
