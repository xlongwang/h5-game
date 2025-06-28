import type { Pinia } from 'pinia'
import type { LocationQueryValue } from 'vue-router'

export interface anyArray {
    [index: number]: any
}

export interface RenderType {
    html: string
    preloadLinks: string
    headTags: string
    store: Pinia
}

export interface ApiConfig {
    id?: LocationQueryValue | LocationQueryValue[]
    page?: number
    path?: string
    from?: string
    limit?: number
}

export interface GlobalStore {
    globalLoading: boolean
    routerLoading: boolean
    ISDEV: boolean
    ISTEST: boolean
    ISPRE: boolean
    ISPROD: boolean
    cookies: Objable
}

// 钱包日志类型
export interface WalletLog {
    id: number
    member_id: number
    reason: string
    game: string
    change: string
    cost_balance: string
    cost_bonus: string
    created_at: string
    updated_at: string
    deleted_at: string | null
}

// 钱包类型
export interface Wallet {
    id: number
    member_id: number
    balance: string
    bonus: string
    total_bet: string
    total_bet_bonus: string
    total_win: string
    total_charge: string
    affiliate_credit: string
    created_at: string
    updated_at: string
    deleted_at: string | null
}

// 用户信息类型
export interface UserInfo {
    id: number
    user_name: string
    status: number
    receiving_account: string | null
    pix_type: string | null
    created_at: string
    updated_at: string
    deleted_at: string | null
    device_id: string
    wallet: Wallet
    wallet_logs: WalletLog[]
    referral: any | null
    referred_by: any | null
}

// 用户信息API响应类型
export interface UserInfoResponse {
    code: number
    message: string
    data: UserInfo
}

// 登录响应类型
export interface LoginResponse {
    code: number
    message: string
    data: {
        access_token: string
        refresh_token: string
        expire_at: number
        user: {
            id: number
            user_name: string
        }
    }
}

// 登录请求参数类型
export interface LoginParams {
    device_id?: string
    [key: string]: any
}

// 认证信息类型
export interface AuthInfo {
    access_token: string
    refresh_token: string
    expire_at: number
    user: {
        id: number
        user_name: string
    }
}

// 用户信息Store类型
export interface UserStore {
    userInfo: UserInfo | null
    authInfo: AuthInfo | null
    loading: boolean
    error: string | null
}

export interface ListConfig {
    hasNext?: number | boolean
    hasPrev?: number | boolean
    path?: string
    page: number
    [propName: string]: any
}

export interface Article {
    c_id: string
    c_title: string
    c_content: string
}

interface ArticleStoreList extends ListConfig {
    data: Article[]
}
export interface ArticleStore {
    lists: ArticleStoreList
    item: {
        data: Nullable<Article>
        path?: string
        [propName: string]: any
    }
}
