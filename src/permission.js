import router from '@/router'
import store from '@/store'
//路由全局守卫
//会在所有路由进去之前触发

const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    //1.登录
    // 是否进入登录页
    // if (!store.state.user.userInfo.userId) {
    //   //获取用户信息
    //   store.dispatch('user/getUserInfo')
    // }
    store.dispatch('user/getUserInfo')

    if (to.path === '/login') {
      //1.1 是 跳转首页
      next('/')
    } else {
      // 1.2不是 直接进入
      next()
    }
  } else {
    //2.不登录
    //访问的是否在白名单
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      //2.1在白名单
      next()
    } else {
      // 2.2不在白名单(不登录不能访问) 跳到登录页
      next('/login')
    }
  }
})
