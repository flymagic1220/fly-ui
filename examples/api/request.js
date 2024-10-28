import axios from 'axios' //注释
import qs from 'qs' //注释
import { Loading, Message } from 'element-ui' //注释

// export const baseUrl = '/suipapi'
export const baseUrl = ''
    // export const baseUrl = 'http://uat.suip.sinopec.com'

const service = axios.create({
    baseURL: '',
    // baseURL: '/suipapi',
    withCredentials: true,
    timeout: 50000, // request timeout
})

// 创建加载中实例
let loadingService

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        loadingService = Loading.service({ fullscreen: true })
        return config
    },
    (error) => {
        loadingService.close()
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        loadingService.close()
        return response.data
    },
    (err) => {
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = '请求错误(400)' //注释
                    break
                case 401:
                    err.message = '未授权，请重新登录(401)' //注释
                    break
                case 403:
                    err.message = '拒绝访问(403)' //注释
                    break
                case 404:
                    err.message = '请求出错(404)' //注释
                    break
                case 408:
                    err.message = '请求超时(408)' //注释
                    break
                case 500:
                    err.message = '服务器错误(500)' //注释
                    break
                case 501:
                    err.message = '服务未实现(501)' //注释
                    break
                case 502:
                    err.message = '网络错误(502)' //注释
                    break
                case 503:
                    err.message = '服务不可用(503)' //注释
                    break
                case 504:
                    err.message = '网络超时(504)' //注释
                    break
                case 505:
                    err.message = 'HTTP版本不受支持(505)' //注释
                    break
                default:
                    err.message = `连接出错(${err.response.status})!` //注释
            }
        } else {
            err.message = '网络错误'
        }
        loadingService.close()
        Message.error({ message: err.message })
        return Promise.reject(err)
    }
)

// 发送POST请求
export const post = (url, params, isQs) => {
    // let loadingService = Loading.service({ fullscreen: true })
    if (!isQs) {
        params = qs.stringify(params)
    }

    return service.post(url, params).then((res) => {
        const { status, success,  } = res
        if (success && status == 200) {
            return Promise.resolve(res.data)
        }
        // msg && Message.error({ message: msg })
        return Promise.reject(res)
    }).catch(err => {
        console.log(err)
    })
}

// 发送GET请求
export const get = (url, params) => {
    return service.get(url, params).then((res) => {
        const { status, success } = res
        if (success && status == 200) {
            return Promise.resolve(res.data)
        }
        // msg && Message.error({ message: msg })
        return Promise.reject(res)
    }).catch(err => {
        console.log(err)
    })
}

// formdata请求上传图片,文件
export const formData = (url, file) => {
    let formData = new FormData()
    formData.append(file)
    return service
        .post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
            const { status, success } = res
            if (success && status == 200) {
                return Promise.resolve(res.data)
            }
            // msg && Message.error({ message: msg })
            return Promise.reject(res)
        }).catch(err => {
            console.log(err)
        })
}
export const postFile = (url, file, params) => {
    return service.post(url, file, {
        headers: {
          'Content-Type':'application/octet-stream'  
        },
        params
    })
}
export const postByJson =(url, data = {})=> {
    return service.post(url, data).then((res) => {
        const { status, success } = res
        if (success && status == 200) {
            return Promise.resolve(res.data)
        }
        // msg && Message.error({ message: msg })
        return Promise.reject(res)
    }).catch(err => {
        console.log(err)
    })
  }

export default service