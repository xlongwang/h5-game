import type { AxiosResponse } from 'axios'
import axios from 'axios'

import qs from 'qs'
import config from './config-client'
import { StorageUtil } from '@/utils/storage'

axios.interceptors.request.use(
    (config) => {
        // 自动添加认证头
        const accessToken = StorageUtil.getAccessToken()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        
        // 添加调试信息
        console.log('API请求:', {
            method: config.method,
            url: config.url,
            data: config.data,
            headers: config.headers
        })
        
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

axios.interceptors.response.use(
    response => {
        // 添加调试信息
        console.log('API响应:', {
            status: response.status,
            url: response.config.url,
            data: response.data
        })
        return response
    },
    error => {
        console.error('API错误:', {
            status: error.response?.status,
            url: error.config?.url,
            data: error.response?.data,
            message: error.message
        })
        return Promise.resolve(error.response)
    },
)

function checkStatus(response: AxiosResponse) {
    if ((response.status === 200 || response.status === 304)) {
        return response.data
    }
    if (response.status === 401) {
        return {
            code: 401,
            info: response.statusText || response.toString(),
            data: response.statusText || response.toString(),
            message: `您还没有登录, 或者登录超时!`,

        }
    }
    return {
        code: -404,
        info: response.statusText || response.toString(),
        data: response.statusText || response.toString(),
        message: `接口返回数据错误, 错误代码: ${response.status || '未知'}`,
    }
}

function checkCode(data: ResponseData<any>) {
    if (data.code === -500) {
        window.location.href = '/backend'
    }
    else if (data.code === -400) {
        window.location.href = '/'
    }
    else if (data.code !== 200) {
        showMsg(data.message)
    }

    return data
}

type API = () => ApiClient

/**
 * axios Api 封装
 * @returns ApiClient
 * @example
 * ```
 * get(url: '/api/url', params: {}, headers: {})
 * post(url: '/api/url', data: {}, headers: {})
 * file(url: '/api/url', data: {}, headers: {})
 * ```
 */
const _api: API = () => ({
    async file(url, data) {
        const response = await axios({
            method: 'post',
            url,
            data,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        const res = checkStatus(response)
        return checkCode(res)
    },
    async post(url, data) {
        const response = await axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        })
        const res = checkStatus(response)
        return checkCode(res)
    },
    async get(url, params) {
        const response = await axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        const res = checkStatus(response)
        return checkCode(res)
    },
})

export default _api()
