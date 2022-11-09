import axios from 'axios'
// import { useMessage } from 'naive-ui'
import store from '@/store'
import { isCheckTimeout } from './auth'

// const message = useMessage()

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 在这里统一注入token
    let token = store.getters.token
    if (token) {
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效'))
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config // 返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    // 要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务错误
      // message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理token超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    // message.error(error.message)
    return Promise.reject(error)
  }
)

export default service
