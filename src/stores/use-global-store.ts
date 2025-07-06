/*
 * @Author: along longwang6@163.com
 * @Date: 2025-07-06 10:02:00
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-06 10:02:17
 * @FilePath: /vue3_app/src/stores/use-global-store.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { GlobalStore } from '@/types'
import { acceptHMRUpdate } from 'pinia'

const useStore = defineStore('globalStore', () => {
    const state: GlobalStore = reactive({
        globalLoading: true,
        routerLoading: false,
        ISDEV: import.meta.env.VITE_APP_ENV === 'development',
        ISPRE: import.meta.env.VITE_APP_ENV === 'pre-release',
        ISTEST: import.meta.env.VITE_APP_ENV === 'test',
        ISPROD: import.meta.env.VITE_APP_ENV === 'production',
        cookies: {},
    })

    const setGlobalLoading = (payload: boolean) => {
        state.globalLoading = payload
    }
    const setRouterLoading = (payload: boolean) => {
        state.routerLoading = payload
    }
    const setCookies = (cookies: Record<string, any>) => {
        state.cookies = cookies
    }

    return {
        ...toRefs(state),
        setGlobalLoading,
        setRouterLoading,
        setCookies,
    }
})

export default useStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useStore as any, import.meta.hot))
}
