
const app = getApp()
export const login = ({
  account,
  password
}) => {
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  return db.collection('users').where({
    account,
    password,
  }).get()
}

export const getCourseList = () => {
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  return db.collection('courses').where({}).get()
}

export const addAnwser = ({
  answerList,
  key
}) => {
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  const user = JSON.parse(JSON.stringify(app.globalData.user))
  user.questionnaire = user.questionnaire || {}
  user.questionnaire[key] = answerList
  const _id = user._id
  delete user._id
  return db.collection('users')
    .doc(_id)
    .set({
      data: user
    })
}

