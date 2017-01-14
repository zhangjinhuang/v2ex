//index.js
var httpRequest = require("../../utils/util.js");
//获取应用实例
var app = getApp()
Page({
    data: {
        datas: [],
        hideLoading: false,
        windowHeight: 0,
        hideRefresh: true,
        hideLoadMore: true
    },
    onLoad: function (options) {
        this.request();
    },
    //请求数据
    request: function () {
        var that = this;
        // this.setData({
        //     hideLoading: false
        // });
        httpRequest.request('https://www.v2ex.com/api/topics/hot.json',"index", function (data) {
            //停止下拉刷新
            wx.stopPullDownRefresh();
            console.log("request success data", data);
            // success
            that.setData({
                datas: data,
                hideLoading: true,
                hideRefresh: true
            })
        }, function (reason) {
            //停止下拉刷新
            wx.stopPullDownRefresh();
            console.log("failure reason:", reason);
            that.setData({
                hideLoading: true,
                hideRefresh: true
            })
        })
    },
    //显示时获取屏幕高度
    onShow: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                // success
                console.log("res:", res);
                that.setData({
                    windowHeight: res.windowHeight
                })
            }
        })
    },
    onPullDownRefresh: function () {
        this.setData({
            hideRefresh: true
        })
        this.request();
    },
    loadMore: function () {
        this.setData({
            hideLoadMore: false
        })
    },
    //分享
    onShareAppMessage: function () {
        return {
            title: "V2EX",
            desc: "创意工作者们的社区",
            path: "pages/index/index"
        }
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
