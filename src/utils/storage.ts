import type { AuthInfo } from '@/types'

// 存储键名常量
const STORAGE_KEYS = {
    AUTH_INFO: 'auth_info',
    USER_INFO: 'user_info',
    DEVICE_ID: 'device_id',
} as const

// 判断是否在客户端
function isClient() {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

/**
 * 本地存储工具类
 */
export class StorageUtil {
    /**
     * 设置认证信息到localStorage
     */
    static setAuthInfo(authInfo: AuthInfo): void {
        if (!isClient()) return
        try {
            localStorage.setItem(STORAGE_KEYS.AUTH_INFO, JSON.stringify(authInfo))
        } catch (error) {
            console.error('保存认证信息失败:', error)
        }
    }

    /**
     * 从localStorage获取认证信息
     */
    static getAuthInfo(): AuthInfo | null {
        if (!isClient()) return null
        try {
            const authInfoStr = localStorage.getItem(STORAGE_KEYS.AUTH_INFO)
            if (!authInfoStr) return null
            
            const authInfo = JSON.parse(authInfoStr) as AuthInfo
            
            // 检查token是否过期
            const isExpired = this.isTokenExpired(authInfo)
            
            if (isExpired) {
                this.removeAuthInfo()
                return null
            }
            
            return authInfo
        } catch (error) {
            console.error('获取认证信息失败:', error)
            return null
        }
    }

    /**
     * 从localStorage移除认证信息
     */
    static removeAuthInfo(): void {
        if (!isClient()) return
        try {
            localStorage.removeItem(STORAGE_KEYS.AUTH_INFO)
        } catch (error) {
            console.error('移除认证信息失败:', error)
        }
    }

    /**
     * 设置用户信息到localStorage
     */
    static setUserInfo(userInfo: any): void {
        if (!isClient()) return
        try {
            localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo))
        } catch (error) {
            console.error('保存用户信息失败:', error)
        }
    }

    /**
     * 从localStorage获取用户信息
     */
    static getUserInfo(): any {
        if (!isClient()) return null
        try {
            const userInfoStr = localStorage.getItem(STORAGE_KEYS.USER_INFO)
            const result = userInfoStr ? JSON.parse(userInfoStr) : null
            return result
        } catch (error) {
            console.error('获取用户信息失败:', error)
            return null
        }
    }

    /**
     * 从localStorage移除用户信息
     */
    static removeUserInfo(): void {
        if (!isClient()) return
        try {
            localStorage.removeItem(STORAGE_KEYS.USER_INFO)
        } catch (error) {
            console.error('移除用户信息失败:', error)
        }
    }

    /**
     * 设置设备ID
     */
    static setDeviceId(deviceId: string): void {
        if (!isClient()) return
        try {
            localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId)
        } catch (error) {
            console.error('保存设备ID失败:', error)
        }
    }

    /**
     * 获取设备ID
     */
    static getDeviceId(): string | null {
        if (!isClient()) return null
        try {
            return localStorage.getItem(STORAGE_KEYS.DEVICE_ID)
        } catch (error) {
            console.error('获取设备ID失败:', error)
            return null
        }
    }

    /**
     * 生成设备ID
     */
    static generateDeviceId(): string {
        const deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        // const deviceId = 'gameasdfsa'
        this.setDeviceId(deviceId)
        return deviceId
    }

    /**
     * 检查token是否过期
     */
    static isTokenExpired(authInfo: AuthInfo): boolean {
        if (!authInfo.expire_at) {
            return true
        }
        
        const now = Math.floor(Date.now() / 1000)
        
        // 从JWT token中解析实际的过期时间
        try {
            const tokenParts = authInfo.access_token.split('.')
            if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]))
                const jwtExp = payload.exp
                
                if (jwtExp) {
                    const isExpired = now >= jwtExp
                    return isExpired
                }
            }
        } catch (error) {
            console.error("解析JWT失败:", error)
        }
        
        // 如果无法解析JWT，使用expire_at作为有效期（秒）
        // expire_at: 3600 表示token还有3600秒有效期
        const isExpired = false // 暂时假设token未过期
        
        return isExpired
    }

    /**
     * 清除所有用户相关数据
     */
    static clearAllUserData(): void {
        this.removeAuthInfo()
        this.removeUserInfo()
    }

    /**
     * 获取访问令牌
     */
    static getAccessToken(): string | null {
        const authInfo = this.getAuthInfo()
        return authInfo?.access_token || null
    }

    /**
     * 获取刷新令牌
     */
    static getRefreshToken(): string | null {
        const authInfo = this.getAuthInfo()
        return authInfo?.refresh_token || null
    }
} 