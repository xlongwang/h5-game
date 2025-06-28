import type { UserInfoResponse, LoginResponse, LoginParams } from '@/types'
import api from './index-client'

/**
 * 用户信息相关API
 */
export const userApi = {
    /**
     * 用户无感登录
     * @param params 登录参数
     * @returns Promise<LoginResponse>
     */
    async login(params: LoginParams = {}): Promise<LoginResponse> {
        console.log('调用登录API，参数:', params)
        return await api.post('/web/loginApi', params)
    },

    /**
     * 获取用户信息
     * @returns Promise<UserInfoResponse>
     */
    async getMemberInfo(): Promise<UserInfoResponse> {
        console.log('调用用户信息API')
        return await api.post('/web/memberinfo', {})
    },
} 