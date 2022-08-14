import request from '@/utils/request'

export function geEmployeesApi() {
  return request({
    url: '/sys/user/simple',
  })
}

/**
 * 获取员工列表
 * @param {*} params { page, size}
 * @returns
 */
export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params,
  })
}
export function delEmployees(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE',
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data,
  })
}

/** *
 *  封装一个导入员工的接口
 *
 * ***/

export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data,
  })
}
