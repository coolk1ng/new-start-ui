import axios from 'axios'
import { Notification } from 'element-ui'
// 自己创建一个axios对象
const request = axios.create({
    baseURL: process.env.VUE_APP_USBKEY_API,
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
// 在发送请求之前做些什么
    // config.headers['Content-Type'] = 'application/json'
    return config
}, function(error) {
// 处理请求错误
    return Promise.reject(error)
})

// 相应拦截器
request.interceptors.response.use(response => {
// 处理响应数据
    return response.data
}, function(error) {
    Notification.error({
        title: 'UsbKey接口请求失败:' + error.toString(),
        duration: 5000
    })
    // 处理响应错误
    return Promise.reject(error)
})

export default request
