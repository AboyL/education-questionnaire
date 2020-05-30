//index.js
const app = getApp()
import { login } from '../../servers/index'

Page({
  data: {
    loginForm: {
      account: '',
      password: '',
      accountRules: {
        type: 'string',
        required: true,
        message: '账号不能为空',
        trigger: 'blur'
      },
      passwordRules: {
        required: true,
        message: '请输入登录密码',
        trigger: 'blur'
      },
    }
  },
  onLoad () {
    wx.lin.initValidateForm(this)
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      // name: 'login',
      name: 'test',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

  },

  async submit ({ detail }) {
    if (detail.isValidate) {
      const res = await login({
        account: detail.values.loginFormAccount,
        password: detail.values.loginFormPassword
      })
      // 判断是否登陆成功
      console.log(res)
      const { data } = res
      if (data.length > 0) {
        wx.lin.showToast({
          title: '登陆成功'
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/course-list/index'
          })
        }, 1500);
        app.globalData.user = data[0]
        this.setData({
          name: data[0].name
        })
      } else {
        wx.lin.showToast({
          title: '账号或者密码不正确'
        })
      }
    }
  }
})
