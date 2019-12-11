//index.js
//获取应用实例
const app = getApp()
var pages = getCurrentPages()
var util = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  viewTap: function() {
    var da = 'success1';
    var that = this;
    var datetime = util.formatTime(new Date());
    wx.request({
      url: 'https://tst.txjk.enjoyfin.cn:15209/opengw/router/rest.htm',
        data: {
          method:'business.wxTest.login',
          account: '1',
          pass_word: '1',
          format:'json',
          app_key:'109012',
          sign_method:'md5',
          sign:'123',
          v:'1.1',
          timestamp: datetime
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function(res) {
          da = res.data.business_wxTest_login_response.msg,
          console.log(res),
          that.setData({
            motto: da
          })
        },
        fail: function(res) {
          da = '失败',
          that.setData({
            motto: da
          })
        }
      })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function() {
    return {
      title: 'hello world',
      path: '/pages/logs/logs?id=123'
    }
  },
})