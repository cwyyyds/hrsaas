import { getUserToken } from '@/api'
import { Message } from 'element-ui'
import router from '@/router'
export default {
  namespaced: true,
  state: {
    token: '',
  },
  getters: {},
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
  },
  actions: {
    async getToken(context, loginForm) {
      try {
        //登录
        const res = await getUserToken(loginForm)
        if (res.data.success) {
          context.commit('setToken', res.data.token)
          Message.success(res.data.msg)
          router.push('/')
        } else {
          Message.error(res.data.msg)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
