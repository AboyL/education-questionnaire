//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init()
    }

    this.globalData = {
      user: {
        _id:'baada3ac5ed12d9b0005b0632308eac3',
        account: 'test',
        password:'test',
        isAdmin: false,
        isExpert: false,
        name: '测试账号',
        questionnaire: {}
      }
    }
  }
})
