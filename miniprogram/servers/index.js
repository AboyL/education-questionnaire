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
  console.log('getCourseList')
  const db = wx.cloud.database()
  // 查询当前用户所有的 counters
  return db.collection('courses').where({}).get()
}

