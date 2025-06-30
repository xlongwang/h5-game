import type { UserInfoResponse, LoginResponse, LoginParams, UserInfo, PayinParams, PayinResponse, PayoutParams, PayoutResponse, UpdateUserInfoParams, UpdateUserInfoResponse, OrderListParams, OrderListResponse, OrderItem } from '@/types'
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

    /**
     * 创建代收订单
     * @param params 代收参数
     * @returns Promise<PayinResponse>
     */
    async createPayin(params: PayinParams): Promise<PayinResponse> {
        console.log('调用创建代收API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<PayinResponse['data']>('/order/payin', params)
        console.log('创建代收API响应:', result)
        return result
    },

    /**
     * 创建代付订单
     * @param params 代付参数
     * @returns Promise<PayoutResponse>
     */
    async createPayout(params: PayoutParams): Promise<PayoutResponse> {
        console.log('调用创建代付API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<string>('/order/payout', params)
        console.log('创建代付API响应:', result)
        return result
    },

    /**
     * 更新用户信息
     * @param params 更新用户信息参数
     * @returns Promise<UpdateUserInfoResponse>
     */
    async updateUserInfo(params: UpdateUserInfoParams): Promise<UpdateUserInfoResponse> {
        console.log('调用更新用户信息API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<string>('/web/updateInfo', params)
        console.log('更新用户信息API响应:', result)
        return result
    },

    /**
     * 获取订单列表
     * @param params 订单列表参数
     * @returns Promise<OrderListResponse>
     */
    async getOrderList(params: OrderListParams): Promise<OrderListResponse> {
        console.log('调用订单列表API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<OrderItem[]>('/order/orderlist', params)
        console.log('订单列表API响应:', result)
        return result
    },
} 