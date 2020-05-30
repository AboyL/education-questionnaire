// miniprogram/pages/success/index.js
Page({

  data: {

  },

  onLoad: function (options) {
    const { key, name } = options
    this.setData({
      key,
      name
    })
  },

  handleGodetail () {
    const { key, name } = this.data
    wx.redirectTo({
      url: `/pages/course-detail/index?key=${key}&name=${name}`
    })
  }
})