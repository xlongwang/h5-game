/*
 * @Author: along longwang6@163.com
 * @Date: 2025-06-30 22:01:40
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-15 21:53:57
 * @FilePath: /vue3_app/src/api/user-api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { GameListParams, GameListResponse, GameLoginParams, GameLoginResponse, InvitationInfoParams, InvitationInfoResponse, InviteUserParams, InviteUserResponse, LoginParams, LoginResponse, OrderItem, OrderListData, OrderListParams, OrderListResponse, OrderQueryParams, OrderQueryResponse, PayinParams, PayinResponse, PayoutParams, PayoutResponse, PaymentConfirmationParams, PaymentConfirmationResponse, SignRewardParams, SignRewardResponse, UpdateUserInfoParams, UpdateUserInfoResponse, UserInfo, UserInfoResponse, WeekSignInfoParams, WeekSignInfoResponse, WithdrawalApplicationParams, WithdrawalApplicationResponse } from '@/types'
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
    async getMemberInfo({ memberId }: { memberId: number }): Promise<UserInfoResponse> {
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
        const result = await api.post<OrderListData>('/order/orderlist', params)
        console.log('订单列表API响应:', result)
        return result
    },

    /**
     * 查询订单状态
     * @param params 订单查询参数
     * @returns Promise<OrderQueryResponse>
     */
    async queryOrder(params: OrderQueryParams): Promise<OrderQueryResponse> {
        console.log('调用订单查询API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.get<OrderQueryResponse['data']>('/order/query', { order_no: params.order_no })
        console.log('订单查询API响应:', result)
        return result
    },

    /**
     * 邀请新用户注册
     * @param params 邀请参数
     * @returns Promise<InviteUserResponse>
     */
    async inviteUser(params: InviteUserParams): Promise<InviteUserResponse> {
        console.log('调用邀请新用户API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<InviteUserResponse['data']>('/web/register', params)
        console.log('邀请新用户API响应:', result)
        return result
    },

    /**
     * 获取游戏列表
     * @param params 游戏列表参数
     * @returns Promise<GameListResponse>
     */
    async getGameList(params: GameListParams): Promise<GameListResponse> {
        console.log('调用游戏列表API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.get<GameListResponse['data']>('/game/List', params)
        console.log('游戏列表API响应:', result)
        return result
    },

    /**
     * 生成游戏地址
     * @param params 游戏登录参数
     * @returns Promise<GameLoginResponse>
     */
    async gameLogin(params: GameLoginParams): Promise<GameLoginResponse> {
        console.log('调用游戏登录API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<string>('/game/Login', params)
        console.log('游戏登录API响应:', result)
        return result
    },

    /**
     * 获取周签到信息
     * @param params 周签到信息参数
     * @returns Promise<WeekSignInfoResponse>
     */
    async getWeekSignInfo(params: WeekSignInfoParams): Promise<WeekSignInfoResponse> {
        console.log('调用周签到信息API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<WeekSignInfoResponse['data']>('/game/weekSignInfo', params)
        console.log('周签到信息API响应:', result)
        return result
    },

    /**
     * 签到奖励
     * @param params 签到奖励参数
     * @returns Promise<SignRewardResponse>
     */
    async signReward(params: SignRewardParams): Promise<SignRewardResponse> {
        console.log('调用签到奖励API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<SignRewardResponse['data']>('/game/signReward', params)
        console.log('签到奖励API响应:', result)
        return result
    },

    /**
     * 获取邀请信息
     * @param params 邀请信息参数
     * @returns Promise<InvitationInfoResponse>
     */
    async getInvitationInfo(params: InvitationInfoParams): Promise<InvitationInfoResponse> {
        console.log('调用邀请信息API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<InvitationInfoResponse['data']>('/web/invitationInfo', params)
        console.log('邀请信息API响应:', result)
        return result
    },

    /**
     * 申请提现
     * @param params 提现申请参数
     * @returns Promise<WithdrawalApplicationResponse>
     */
    async applyWithdrawal(params: WithdrawalApplicationParams): Promise<WithdrawalApplicationResponse> {
        console.log('调用申请提现API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<WithdrawalApplicationResponse['data']>('/web/withdrawalApplication', params)
        console.log('申请提现API响应:', result)
        return result
    },

    /**
     * 发起提现
     * @param params 发起提现参数
     * @returns Promise<PaymentConfirmationResponse>
     */
    async paymentConfirmation(params: PaymentConfirmationParams): Promise<PaymentConfirmationResponse> {
        console.log('调用发起提现API，参数:', params)
        console.log('API基础URL:', import.meta.env.DEV ? '/mock-api/' : '/api/')
        const result = await api.post<string>('/order/paymentConfirmation', params)
        console.log('发起提现API响应:', result)
        return result
    },
}
