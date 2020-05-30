// miniprogram/pages/course-detail/index.js
import { questionnaire } from '../../utils/paper'
import { addAnwser } from '../../servers/index'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    readyScore: false,
    currentIndex: 0,
    answerList: [[]],
    questionnaire,
    btnName: questionnaire.length === 1 ? '提交' : '下一步'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 根据实际情况进行判断
    // 根据 questionnaire 生成对应的数组
    const { key, name } = options
    const user = JSON.parse(JSON.stringify(app.globalData.user))
    if (user.questionnaire[key]) {
      this.setData({
        readyScore: true
      })
      return
    }
    const answerList = []
    questionnaire.forEach((item, index) => {
      answerList.push([])
      item.questionList.forEach(() => {
        answerList[index].push('')
      })
    })
    this.setData({
      readyScore: false,
      answerList,
      key,
      name
    })
  },
  handleChoose (e) {
    const answerList = this.data.answerList
    answerList[this.data.currentIndex][e.mark.index] = e.detail.key
    this.setData({
      answerList
    })
  },
  async handleNext () {
    // 校验
    const { key } = this.data
    const { currentIndex, answerList } = this.data
    if (answerList[currentIndex].some(v => !v)) {
      wx.lin.showToast({
        title: '存在选项未填写'
      })
      return
    }
    if (currentIndex === answerList.length - 1) {
      // 提交
      try {
        const res = await addAnwser({
          answerList,
          key
        })
        wx.lin.showToast({
          title: '提交成功'
        })
      } catch (error) {
        console.error(error)
        wx.lin.showToast({
          title: '提交出错'
        })
      }
      return
    }
    const c = currentIndex + 1
    this.setData({
      currentIndex: c,
      btnName: c === (answerList.length - 1) ? '提交' : '下一步'
    })
  }
})