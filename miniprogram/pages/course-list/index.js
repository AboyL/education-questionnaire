const app = getApp()
import { getCourseList } from '../../servers/index'

Page({
  data: {
    list: []
  },

  async onLoad (options) {
    try {
      const res = await getCourseList()
      console.log(res)
      if (res.data.length > 0) {
        this.setData({
          list: res.data
        })
      }
    } catch (error) {
      console.error(error)
      wx.lin.showToast({
        title: '接口出错'
      })
    }
  },
  handleGoDetail (e) {
    const { key, name } = e.mark
    wx.navigateTo({
      url: `/pages/course-detail/index?key=${key}&name=${name}`
    })
  }
})