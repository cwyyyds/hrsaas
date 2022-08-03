import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data
 * @returns promise
 */

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data,
  })
}

/**
 * 获取用户信息
 * @returns promise
 */
export function getUserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST',
  })
}
/**
 *
 * @param {String} id
 * @returns promise
 */
export function getUserDetail(id) {
  return request({
    url: '/sys/user/' + id,
  })
}
