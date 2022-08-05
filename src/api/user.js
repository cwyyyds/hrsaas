import request from '@/utils/request'

/**
 * 用户基本信息
 * @returns
 */
export function getUserService() {
  return request({
    url: '/api/user-service/user/',
  })
}
