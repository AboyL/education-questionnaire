// miniprogram/pages/course-detail/index.js
import { questionnaire, getScore, getExpertScore } from '../../utils/paper'
import { addAnwser, getTeacher } from '../../servers/index'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseName: '',
    readyScore: false,
    userScore: 0,
    expertScore: 0,
    currentIndex: 0,
    answerList: [[]],
    questionnaire,
    btnName: questionnaire.length === 1 ? '提交' : '下一步'
  },

  async onLoad (options) {
    // 根据实际情况进行判断
    // 根据 questionnaire 生成对应的数组
    const { key, name } = options
    const user = JSON.parse(JSON.stringify(app.globalData.user))
    if (user.questionnaire && user.questionnaire[key]) {
      const expertScore = await getExpertScore(key)
      this.setData({
        readyScore: true,
        key,
        courseName: name,
        expertScore,
        userScore: getScore(user.questionnaire[key])
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
      courseName: name
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
        const teacher = (await getTeacher(app.globalData.user._id)).data
        app.globalData.user = teacher

        wx.lin.showToast({
          title: '提交成功'
        })
        setTimeout(() => {
          wx.redirectTo({
            url: `/pages/success/index?key=${key}&name=${this.data.courseName}`
          })
        }, 1000);
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