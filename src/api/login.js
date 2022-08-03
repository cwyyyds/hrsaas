import request from '@/utils/request'

/**
 *
 * @returns 验证码图片
 */
export function getCodeImg(clientToken) {
  return request({
    url: `api/user-service/user/imageCode/${clientToken}`,
    responseType: 'blob',
  })
}

/**
 * 登录
 * @param {Object} loginForm
 * @param {String} clientToken
 * @returns
 */
export const getUserToken = (loginForm) => {
  return request({
    url: '/api/user-service/user/login',
    method: 'POST',
    data: {
      loginName: loginForm.loginName,
      password: loginForm.password,
      code: loginForm.code,
      clientToken: loginForm.clientToken,
      loginType: 0,
    },
  })
}
