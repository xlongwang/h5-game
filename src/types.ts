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
    total_withdraw: string
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
    total_withdraw: string
}

// 用户信息类型
// 收款账户信息类型
export interface ReceivingAccount {
    phone: string
    pix_type: string
    receiving_name: string
    receiving_account: string
}

export interface UserInfo {
    id: number
    name: string
    status: number
    receiving_account: ReceivingAccount | null
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

// 代收请求参数类型
export interface PayinParams {
    /**
     * 金额
     */
    amount: string
    /**
     * 用户id
     */
    player_id: string
    [property: string]: any
}

// 代收响应数据类型
export interface PayinData {
    /**
     * 订单号
     */
    order_no: string
    /**
     * 支付地址，需转换为二维码显示不需要显示原地址
     */
    payInfo: string
    [property: string]: any
}

// 代收API响应类型
export interface PayinResponse {
    code: number
    data: PayinData
    message: string
    [property: string]: any
}

// 代付请求参数类型
export interface PayoutParams {
    /**
     * 金额
     */
    amount: string
    /**
     * 手机号
     */
    phone: string
    /**
     * 账户类型
     */
    pix_type: string
    /**
     * 用户id
     */
    player_id: string
    /**
     * 账户号
     */
    receiving_account: string
    /**
     * 账户名
     */
    receiving_name: string
    [property: string]: any
}

// 代付API响应类型
export interface PayoutResponse {
    code: number
    data: string
    message: string
    [property: string]: any
}

// 更新用户信息请求参数类型
export interface UpdateUserInfoParams {
    /**
     * 手机号
     */
    phone?: string | undefined
    email?: string | undefined
    cpf?: string | undefined
    /**
     * 可选值PHONE,EMAIL,CPF,CNPJ
     */
    pix_type: string
    player_id: string
    /**
     * 账户号
     */
    receiving_account: string
    /**
     * 账户名
     */
    receiving_name: string
    [property: string]: any
}

// 更新用户信息API响应类型
export interface UpdateUserInfoResponse {
    code: number
    data: string
    message: string
    [property: string]: any
}

// 订单列表请求参数类型
export interface OrderListParams {
    /**
     * 订单标识1为充值2为提现
     */
    genre?: string
    /**
     * 页码(目前固定15条分页)
     */
    page?: string
    /**
     * 用户id
     */
    player_id: string
    [property: string]: any
}

// 订单数据项类型
export interface OrderItem {
    /**
     * 订单金额
     */
    amount: number
    /**
     * 创建时间
     */
    created_at: number
    id: number
    /**
     * 账户类型，充值列表时为null
     */
    pix_type?: null | string
    /**
     * 订单号
     */
    plantform_no: string
    /**
     * 提现账户，充值列表时为null
     */
    receiving_account?: null | string
    /**
     * 订单状态
     */
    status: string
    /**
     * 更新时间
     */
    updated_at: number
    [property: string]: any
}

// 订单列表分页数据类型
export interface OrderListData {
    /**
     * 当前页
     */
    current_page: number
    /**
     * 最后一页
     */
    last_page: number
    /**
     * 订单列表
     */
    list: OrderItem[]
    /**
     * 每页条数
     */
    per_page: number
    /**
     * 总条数
     */
    total: number
    [property: string]: any
}

// 订单列表API响应类型
export interface OrderListResponse {
    code: number
    data: OrderListData
    message: string
    [property: string]: any
}

// 订单查询请求参数类型
export interface OrderQueryParams {
    /**
     * 订单号
     */
    order_no: string
    [property: string]: any
}

// 订单查询响应数据类型
export interface OrderQueryData {
    /**
     * 订单号
     */
    order_no: string
    /**
     * 订单状态，除SUCCESS外均为未成功付款
     * GENERATED: 已生成
     * SUCCESS: 成功
     * FAIL: 失败
     * RETURN: 退回
     */
    status: string
    [property: string]: any
}

// 订单查询API响应类型
export interface OrderQueryResponse {
    code: number
    data: OrderQueryData
    message: string
    [property: string]: any
}

// 订单状态枚举
export enum OrderStatus {
    GENERATED = 'GENERATED', // 已生成
    SUCCESS = 'SUCCESS', // 成功
    FAIL = 'FAIL', // 失败
    RETURN = 'RETURN', // 退回
}

// 邀请新用户请求参数类型
export interface InviteUserParams {
    /**
     * 新用户设备id
     */
    device_id: string
    /**
     * 邀请人id
     */
    ref: string
    [property: string]: any
}

// 邀请新用户响应数据类型
export interface InviteUserData {
    /**
     * token
     */
    access_token: string
    /**
     * 过期时间
     */
    expire_at: number
    user: {
        /**
         * 用户id
         */
        id: number
        /**
         * 用户名
         */
        name: string
        [property: string]: any
    }
    [property: string]: any
}

// 邀请新用户API响应类型
export interface InviteUserResponse {
    code: number
    data: InviteUserData
    message: string
    [property: string]: any
}

// 游戏列表请求参数类型
export interface GameListParams {
    /**
     * 目前只有这一种,留出后续增加的位置
     */
    type: string
    [property: string]: any
}

// 游戏信息类型
export interface GameInfo {
    /**
     * 游戏Logo
     */
    logo: string
    /**
     * 游戏名
     */
    name: string
    [property: string]: any
}

// 游戏列表API响应类型
export interface GameListResponse {
    code: number
    data: GameInfo[]
    message: string
    [property: string]: any
}

// 游戏登录请求参数类型
export interface GameLoginParams {
    /**
     * 游戏名称,具体值参考游戏列表接口
     */
    game_name: string
    /**
     * 用户id
     */
    player_id: number
    [property: string]: any
}

// 游戏登录API响应类型
export interface GameLoginResponse {
    code: number
    /**
     * 游戏跳转地址不要跳转到外部 嵌套在内部运行
     */
    data: string
    message: string
    [property: string]: any
}

// 周签到信息请求参数类型
export interface WeekSignInfoParams {
    /**
     * 用户id
     */
    player_id: string
    [property: string]: any
}

// 奖励信息类型
export interface Reward {
    /**
     * 星期几（1～7）
     */
    day: number
    /**
     * 奖励内容（如 "5 reais"）
     */
    reward: string
    /**
     * 状态：• received：已领取• available：可领取• locked：未解锁
     */
    status: string
    [property: string]: any
}

// 额外奖励信息类型
export interface ExtraReward {
    /**
     * 触发条件说明，例如 "Sign all 7 days"
     */
    condition: string
    /**
     * 额外奖励内容，例如 "Mystery Box"
     */
    reward: string
    /**
     * 状态：• available：可领取• locked：未达成
     */
    status: string
    [property: string]: any
}

// 周签到信息数据类型
export interface WeekSignInfoData {
    /**
     * 今天是否可以签到（未签过为 true）
     */
    can_sign_today: boolean
    extra_reward: ExtraReward
    rewards: Reward[]
    /**
     * 已签到的星期几数组，例如 [1, 3, 5]
     */
    signed_days: number[]
    /**
     * 今天是否已经签到过了
     */
    signed_today: boolean
    /**
     * 当前连续签到天数（从今天往前推）
     */
    streak: number
    /**
     * 今天是周几（1 = 周一，7 = 周日）
     */
    today: number
    /**
     * 本周累计签到天数
     */
    total_signed: number
    /**
     * 当前是今年的第几周（ISO 周数）
     */
    week: number
    [property: string]: any
}

// 周签到信息API响应类型
export interface WeekSignInfoResponse {
    code: number
    data: WeekSignInfoData
    message: string
    [property: string]: any
}
