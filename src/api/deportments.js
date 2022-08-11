import request from '@/utils/request'

export function getDeptsApi() {
  return request({
    url: '/company/department',
  })
}

export function delDeptsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE',
  })
}

export function addDeptsApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data,
  })
}

export function getDeptByApi(id) {
  return request({
    url: '/company/department/' + id,
  })
}

export function editDeptApi(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data,
  })
}
