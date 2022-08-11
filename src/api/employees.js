import request from '@/utils/request'

export function geEmployeesApi() {
  return request({
    url: '/sys/user/simple',
  })
}
