export interface ResponseData<T = any> {
  token: string
  code: number
  message: string
  data: T
} 