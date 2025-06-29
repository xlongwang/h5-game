import type { UserInfoResponse, LoginResponse, LoginParams, UserInfo } from '@/types'
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
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<{
            access_token: string
            refresh_token: string
            expire_at: number
            user: {
                id: number
                user_name: string
            }
        }>('/web/loginApi', params)
        console.log('登录API响应:', result)
        return result
    },

    /**
     * 获取用户信息
     * @param params 包含memberId的参数对象
     * @returns Promise<UserInfoResponse>
     */
    async getMemberInfo({ memberId } : { memberId: number }): Promise<UserInfoResponse> {
        console.log('调用用户信息API，memberId:', memberId)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<UserInfo>('/web/memberinfo', {
            player_id: memberId,
        })
        console.log('用户信息API响应:', result)
        return result
    },
} 