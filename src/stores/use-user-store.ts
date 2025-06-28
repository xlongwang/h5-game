import type { UserInfo, UserStore, AuthInfo, LoginParams } from '@/types'
import { acceptHMRUpdate } from 'pinia'
import { userApi } from '@/api/user-api'
import { StorageUtil } from '@/utils/storage'

const useUserStore = defineStore('userStore', () => {
    const state: UserStore = reactive({
        userInfo: null,
        authInfo: null,
        loading: false,
        error: null,
    })

    /**
     * 初始化认证信息
     */
    const initAuthInfo = () => {
        const authInfo = StorageUtil.getAuthInfo()
        if (authInfo) {
            state.authInfo = authInfo
            return true
        }
        return false
    }

    /**
     * 初始化用户信息
     */
    const initUserInfo = () => {
        const userInfo = StorageUtil.getUserInfo()
        if (userInfo) {
            state.userInfo = userInfo
            return true
        }
        return false
    }

    /**
     * 用户无感登录
     */
    const login = async (params: LoginParams = {}) => {
        try {
            state.loading = true
            state.error = null
            
            // 获取或生成设备ID
            let deviceId = StorageUtil.getDeviceId()
            if (!deviceId) {
                deviceId = StorageUtil.generateDeviceId()
            }
            
            const loginParams = {
                device_id: deviceId,
                ...params
            }
            
            const response = await userApi.login(loginParams)
            
            if (response.code === 200) {
                // 保存认证信息到localStorage
                StorageUtil.setAuthInfo(response.data)
                state.authInfo = response.data
                
                console.log('登录成功:', response.data)
                return response.data
            } else {
                throw new Error(response.message || '登录失败')
            }
        } catch (error: any) {
            state.error = error.message || '网络错误'
            console.error('登录失败:', error)
            throw error
        } finally {
            state.loading = false
        }
    }

    /**
     * 获取用户信息
     */
    const fetchUserInfo = async () => {
        try {
            state.loading = true
            state.error = null
            
            const response = await userApi.getMemberInfo()
            
            if (response.code === 200) {
                // 保存用户信息到localStorage
                StorageUtil.setUserInfo(response.data)
                state.userInfo = response.data
                return response.data
            } else {
                throw new Error(response.message || '获取用户信息失败')
            }
        } catch (error: any) {
            state.error = error.message || '网络错误'
            console.error('获取用户信息失败:', error)
            throw error
        } finally {
            state.loading = false
        }
    }

    /**
     * 自动登录流程
     */
    const autoLogin = async () => {
        try {
            // 检查是否有有效的认证信息
            if (!initAuthInfo()) {
                console.log('没有有效的认证信息，开始无感登录')
                await login()
            }
            
            // 获取用户信息
            if (!initUserInfo()) {
                console.log('获取用户详细信息')
                await fetchUserInfo()
            }
            
            return true
        } catch (error) {
            console.error('自动登录失败:', error)
            return false
        }
    }

    /**
     * 登出
     */
    const logout = () => {
        // 清除store状态
        state.userInfo = null
        state.authInfo = null
        state.error = null
        
        // 清除localStorage
        StorageUtil.clearAllUserData()
        
        console.log('用户已登出')
    }

    /**
     * 清除用户信息
     */
    const clearUserInfo = () => {
        state.userInfo = null
        state.error = null
        StorageUtil.removeUserInfo()
    }

    /**
     * 获取用户余额
     */
    const getUserBalance = computed(() => {
        return state.userInfo?.wallet?.balance || '0.00'
    })

    /**
     * 获取用户奖金
     */
    const getUserBonus = computed(() => {
        return state.userInfo?.wallet?.bonus || '0.00'
    })

    /**
     * 获取用户总投注
     */
    const getUserTotalBet = computed(() => {
        return state.userInfo?.wallet?.total_bet || '0.00'
    })

    /**
     * 获取用户总充值
     */
    const getUserTotalCharge = computed(() => {
        return state.userInfo?.wallet?.total_charge || '0.00'
    })

    /**
     * 检查用户是否已登录
     */
    const isLoggedIn = computed(() => {
        return !!(state.authInfo && state.userInfo)
    })

    /**
     * 获取访问令牌
     */
    const getAccessToken = computed(() => {
        return state.authInfo?.access_token || StorageUtil.getAccessToken()
    })

    /**
     * 获取设备ID
     */
    const getDeviceId = computed(() => {
        return StorageUtil.getDeviceId()
    })

    return {
        userInfo: toRef(state, 'userInfo'),
        authInfo: toRef(state, 'authInfo'),
        loading: toRef(state, 'loading'),
        error: toRef(state, 'error'),
        login,
        fetchUserInfo,
        autoLogin,
        logout,
        clearUserInfo,
        initAuthInfo,
        initUserInfo,
        getUserBalance,
        getUserBonus,
        getUserTotalBet,
        getUserTotalCharge,
        isLoggedIn,
        getAccessToken,
        getDeviceId,
    }
})

export default useUserStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
} 