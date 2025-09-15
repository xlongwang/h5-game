import type { GameInfo } from '@/types'
import { ref } from 'vue'
import { userApi } from '@/api/user-api'
import useUserStore from '@/stores/use-user-store'

export function useGameIframe() {
    const gameIframeVisible = ref(false)
    const gameIframeUrl = ref('')
    const gameLoading = ref(false)
    const userStore = useUserStore()

    /**
     * 打开游戏iframe
     * @param game 游戏信息
     */
    const openGame = async (game: GameInfo) => {
        console.log('Opening game:', game)

        try {
            gameLoading.value = true

            // 调用游戏登录接口
            const result = await userApi.gameLogin({
                game_name: game.name,
                player_id: userStore.userInfo?.id || 0,
            })

            if (result.code === 200 && result.data) {
                gameIframeUrl.value = result.data
                gameIframeVisible.value = true
            }
            else {
                console.error('获取游戏地址失败:', result.message)
                // 这里可以添加错误提示
            }
        }
        catch (error) {
            console.error('游戏登录失败:', error)
            // 这里可以添加错误提示
        }
        finally {
            gameLoading.value = false
        }
    }

    /**
     * 关闭游戏iframe
     */
    const closeGame = () => {
        gameIframeVisible.value = false
        gameIframeUrl.value = ''
        // 刷新用户信息
        userStore.fetchUserInfo()
    }

    /**
     * 直接设置游戏URL（用于测试或特殊情况）
     * @param url 游戏URL
     */
    const setGameUrl = (url: string) => {
        gameIframeUrl.value = url
        gameIframeVisible.value = true
    }

    return {
    // 状态
        gameIframeVisible,
        gameIframeUrl,
        gameLoading,

        // 方法
        openGame,
        closeGame,
        setGameUrl,
    }
}
