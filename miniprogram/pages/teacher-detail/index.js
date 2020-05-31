import { getTeacher, getCourseList } from '../../servers/index'
import { getScore, getExpertScore } from '../../utils/paper'

Page({

  data: {
    teacher: {},
    courseList: []
  },

  async onLoad (options) {
    const teacher = (await getTeacher(options.id)).data
    const courseList = (await getCourseList()).data
    for (let course of courseList) {
      if (teacher.questionnaire && teacher.questionnaire[course.key]) {
        course.userScore = getScore(teacher.questionnaire[course.key])
        course.expertScore = await getExpertScore(course.key)
        debugger
      }
    }
    this.setData({
      courseList,
      teacher
    })
  },


})