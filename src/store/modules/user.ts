import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'
import type { ResponseData } from '@/types'

interface UserState {
  token: string
  userInfo: UserInfo
}

interface UserInfo {
  name?: string
  avatar?: string
  roles?: string[]
  permissions?: string[]
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: localStorage.getItem('token') || '',
    userInfo: {}
  }),
  
  actions: {
    async login(loginForm: { username: string; password: string }) {
      try {
        const { data } = await login(loginForm)
        this.token = data.token
        localStorage.setItem('token', data.token)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    
    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('token')
    }
  }
}) 