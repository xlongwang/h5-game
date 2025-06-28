import type { MockMethod } from './_mock.types'

export default [
    {
        // 测试mock服务
        url: `/mock-api/test-mock`,
        method: 'get',
        response: () => {
            console.log('✅ Mock测试接口被调用')
            return {
                code: 200,
                message: 'Mock服务正常工作',
                data: { timestamp: Date.now() }
            }
        },
    },
    
    {
        // 用户无感登录
        url: `/mock-api/web/loginApi`,
        method: 'post',
        response: ({ body }) => {
            console.log('✅ Mock登录接口被调用，参数:', body)
            const deviceId = body.device_id || 'device_' + Date.now()
            
            return {
                code: 200,
                message: 'ok',
                data: {
                    access_token: 'mock_access_token_' + Date.now(),
                    refresh_token: 'mock_refresh_token_' + Date.now(),
                    expire_at: 3600,
                    user: {
                        id: 10,
                        user_name: `player_${Math.random().toString(36).substr(2, 9)}`
                    }
                }
            }
        },
    } as MockMethod<{ device_id: string }>,
    
    {
        // 获取用户信息
        url: `/mock-api/web/memberinfo`,
        method: 'post',
        response: ({ body }) => {
            console.log('✅ Mock用户信息接口被调用，参数:', body)
            const memberId = body.memberId || 10
            
            return {
                code: 200,
                message: 'ok',
                data: {
                    id: memberId,
                    user_name: `player_${Math.random().toString(36).substr(2, 9)}`,
                    status: 1,
                    receiving_account: null,
                    pix_type: null,
                    created_at: '2025-06-28T12:00:00.000000Z',
                    updated_at: '2025-06-28T12:00:00.000000Z',
                    deleted_at: null,
                    device_id: 'device_' + Date.now(),
                    wallet: {
                        id: 1,
                        member_id: memberId,
                        balance: '1250.50',
                        bonus: '150.00',
                        total_bet: '5000.00',
                        total_bet_bonus: '300.00',
                        total_win: '2500.00',
                        total_charge: '3000.00',
                        affiliate_credit: '50.00',
                        created_at: '2025-06-28T12:00:00.000000Z',
                        updated_at: '2025-06-28T12:00:00.000000Z',
                        deleted_at: null
                    },
                    wallet_logs: [
                        {
                            id: 1,
                            member_id: memberId,
                            reason: '游戏投注',
                            game: 'Slot Machine',
                            change: '-50.00',
                            cost_balance: '50.00',
                            cost_bonus: '0.00',
                            created_at: '2025-06-28T13:30:00.000000Z',
                            updated_at: '2025-06-28T13:30:00.000000Z',
                            deleted_at: null
                        }
                    ],
                    referral: null,
                    referred_by: null
                }
            }
        },
    } as MockMethod<{ memberId: number }>,
] as MockMethod[] 