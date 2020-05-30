import { getTeacherList } from '../../servers/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  async onLoad (options) {
    const res = await getTeacherList()
    this.setData({
      list: res.data
    })
  },
  handleGoTeacherDetail (e) {
    wx.navigateTo({
      url: `/pages/teacher-detail/index?id=${e.mark.id}`
    })
  }
})