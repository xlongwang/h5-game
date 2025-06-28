import useUserStore from '@/stores/use-user-store'

export function useGlobal() {
    const ins = getCurrentInstance()!

    const ctx = ins.appContext.config.globalProperties
    const options = ins.type
    const route = useRoute()
    const router = useRouter()
    const globalStore = useGlobalStore()
    const userStore = useUserStore()

    return {
        ctx,
        options,
        route,
        router,
        globalStore: {
            globalLoading: globalStore.globalLoading,
            routerLoading: globalStore.routerLoading,
            cookies: globalStore.cookies,
            setGlobalLoading: globalStore.setGlobalLoading,
            setRouterLoading: globalStore.setRouterLoading,
            setCookies: globalStore.setCookies,
        },
        userStore: {
            userInfo: userStore.userInfo,
            authInfo: userStore.authInfo,
            loading: userStore.loading,
            error: userStore.error,
            login: userStore.login,
            fetchUserInfo: userStore.fetchUserInfo,
            autoLogin: userStore.autoLogin,
            logout: userStore.logout,
            clearUserInfo: userStore.clearUserInfo,
            initAuthInfo: userStore.initAuthInfo,
            initUserInfo: userStore.initUserInfo,
            getUserBalance: userStore.getUserBalance,
            getUserBonus: userStore.getUserBonus,
            getUserTotalBet: userStore.getUserTotalBet,
            getUserTotalCharge: userStore.getUserTotalCharge,
            isLoggedIn: userStore.isLoggedIn,
            getAccessToken: userStore.getAccessToken,
            getDeviceId: userStore.getDeviceId,
        },
    }
}

/**
 * 竞态锁
 * @param fn 回调函数
 * @param autoUnlock 是否自动解锁
 * @description
 * ```
 * autoUnlock === true 不管 fn 返回什么, 都自动解锁
 * autoUnlock === false 不管 fn 返回什么, 都不自动解锁
 * autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
 * ```
 * @example
 * ```
 * const Fn = useLockFn(async (key) => {
 *  console.log(key)
 * }
 *
 * <div v-on:click="Fn(123)"></div>
 * ```
 */
export function useLockFn(fn: AnyFn, autoUnlock: boolean | 'auto' = 'auto') {
    const lock = ref(false)
    return async (...args: any[]) => {
        if (lock.value) {
            return
        }
        lock.value = true
        try {
            const $return: any = await fn(...args)
            if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) {
                lock.value = false
            }
        }
        catch (e) {
            lock.value = false
            throw e
        }
    }
}
