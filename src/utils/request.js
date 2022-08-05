import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import { getTokenTime } from '@/utils/auth'
function isTimeOut() {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}

const request = axios.create({
  baseURL: 'http://likede2-admin.itheima.net/likede/',

  timeout: 5000,
}) // 创建一个axios的实例
request.interceptors.request.use(async (config) => {
  if (store.state.user.token) {
    if (isTimeOut()) {
      //如果token过期就跳到login页面
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      config.headers.Authorization = store.state.user.token
    }
  }

  if (config.url === '/api/user-service/user/') {
    config.url = config.url + store.state.user.userInfo.userId
  }

  return config
})
request.interceptors.response.use(
  (res) => {
    return res
  },
  async function (error) {
    //es11 ?.
    if (error?.response?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }

    return Promise.reject(error)
  },
)
export default request
