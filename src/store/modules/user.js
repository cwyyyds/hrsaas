import { getUserToken, getUserService } from '@/api'
import { Message } from 'element-ui'
import { setTokenTime } from '@/utils/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    userService: {},
  },
  getters: {},
  mutations: {
    setToken(state, payload) {
      state.token = payload.token
      state.userInfo = payload
    },
    setUserService(state, payload) {
      state.userService = payload
    },
  },
  actions: {
    async getToken(context, loginForm) {
      try {
        //登录
        const res = await getUserToken(loginForm)
        if (res.data.success) {
          context.commit('setToken', res.data)
          setTokenTime()
          Message.success(res.data.msg)
          router.push('/dashboard')
        } else {
          Message.error(res.data.msg)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getUserService(context) {
      //获取用户信息
      const res = await getUserService()
      context.commit('setUserService', res.data)
    },
    logout(context) {
      context.commit('setToken', '')
      context.commit('setUserService', '')
    },
  },
}
