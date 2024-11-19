import request from '@/utils/request'
import type { ResponseData } from '@/types'

interface LoginData {
  username: string
  password: string
}

interface LoginResponse {
  token: string
}

interface UserInfo {
  name: string
  avatar: string
  roles: string[]
  permissions: string[]
}

interface UserListResponse {
  total: number
  list: any[]
}

export function login(data: LoginData) {
  return request<ResponseData<LoginResponse>>({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request<ResponseData<UserInfo>>({
    url: '/api/user/info',
    method: 'get'
  })
}

export function getUserList(params: { pageNum: number; pageSize: number }) {
  return request<ResponseData<UserListResponse>>({
    url: '/api/system/users',
    method: 'get',
    params
  })
} 