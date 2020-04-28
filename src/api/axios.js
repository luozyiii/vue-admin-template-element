import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import { RES_SUC_CODE, RES_FAIL_DATED_CODE } from '@/config'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

const baseURL = '/baseApis/'
const instance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache'
  }
})

// http request 拦截器
instance.interceptors.request.use(
  request => {
    if (request.method === 'get') {
      request.params = {
        ...request.params
      }
    } else if (request.method === 'post') {
      request.data = Object.assign(
        request.data
      )
    }
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data

    if (!!res.status && res.status !== RES_SUC_CODE) {
      // 登录过期处理
      if (res.status === RES_FAIL_DATED_CODE) {
        source.cancel() // 取消其他正在进行的请求
        MessageBox({
          title: '过期提示',
          message: '登录已过期，请重新登录!',
          showCancelButton: true,
          confirmButtonText: '确定'
        }).then(action => {
          localStorage.clear()
          router.push({
            path: '/login'
          })
        })
      } else {
        this.$message.error(res.msg)
      }
    }

    return res
  },
  error => {
    Message.error(`请求异常 错误码: ${error.response.status}`)
    console.log(error)
  }
)

export default instance
