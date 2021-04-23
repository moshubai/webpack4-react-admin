// import store from '@/store';
import axios from 'axios'
import { message, Button, Space } from 'antd'
// import util from '@/libs/util'
import Setting from '../../../setting'
// import router from '@/router';
const errorLog = (err) => {
  message.error(err)
  return false
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: Setting.proxyHost,
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    console.log('config', config) // xu-log
    // 在请求发送之前做一些处理
    // const token = util.cookies.get('token')
    // config.headers.token = token
    // config.params = util.paramsFormat(config.params)
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    console.log('', code) // xu-log
    // if (response.config.responseType === 'blob') {
    //   return dataAxios
    // }
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断

      switch (code) {
        case 0:
        // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data
        case 500:
          errorLog(dataAxios.msg)

          break
        default:
          // errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401:
          error.message = '未授权，请登录'
          console.log('未授权，请登录') // xu-log
          // util.cookies.remove('token')
          // router.push({
          //   path: '/login'
          // })
          break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    // console.log('error', error)
    return Promise.reject(error)
  }
)

export default service
