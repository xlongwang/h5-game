<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-29 15:04:18
 * @FilePath: /vue3_app/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="main">
        <!-- Loading 状态 -->
        <div v-if="isLoading" class="loading-overlay">
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-text font-[50px]">{{ loadingText }}</div>
            </div>
        </div>

        <!-- 主内容 -->
        <div v-else class="body">
            <router-view v-slot="{ Component }" :key="$route.path">
                <component :is="Component" v-if="Component" />
            </router-view>
        </div>

        <!-- Bottom Navigation -->
        <div v-if="!isLoading && $route.path !== '/record'" class="bottom-nav text-[30px] text-gold">
            <template v-for="item in navItems" :key="item.name">
                <!-- 内部路由使用 router-link -->
                <router-link
                    :to="item.to"
                    class="nav-item"
                    :class="{ active: activeNav === item.name }"
                >
                    <img class="nav-icon" :src="activeNav === item.name ? item.activeIcon : item.inactiveIcon">
                    <span class="text-[30px]">{{ item.name }}</span>
                </router-link>
                <!-- 外部链接使用 a 标签 -->
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobal } from '@/composables'

defineOptions({
    name: 'AppRoot',
})

const activeNav = ref('Casino')
const route = useRoute()

const isLoading = ref(true)
const loadingText = ref('正在初始化...')

const navItems = ref([
    { name: 'Casino', to: '/', activeIcon: '/images/casino/home.png', inactiveIcon: '/images/casino/home.png' },
    { name: 'Promoción', to: '/promotion', activeIcon: '/images/casino/gift.png', inactiveIcon: '/images/casino/gift.png' },
    { name: 'Retirar', to: '/retirar', activeIcon: '/images/casino/coin_b.png', inactiveIcon: '/images/casino/coin_b.png' },
    { name: 'Apoyo', to: '/apoyo', activeIcon: '/images/casino/serve.png', inactiveIcon: '/images/casino/serve.png' },
    { name: 'Perfil', to: '/perfil', activeIcon: '/images/casino/person.png', inactiveIcon: '/images/casino/person.png' },
])

const { userStore } = useGlobal()

// 监听路由变化，同步 activeNav
watch(() => route.path, (newPath) => {
    const currentItem = navItems.value.find(item => item.to === newPath)
    if (currentItem && activeNav.value !== currentItem.name) {
        activeNav.value = currentItem.name
    }
}, { immediate: true })

/**
 * 智能登录流程
 */
async function smartLogin() {
    try {
        // 1. 检查本地存储的认证信息
        loadingText.value = '检查登录状态...'
        const hasAuthInfo = userStore.initAuthInfo()
        const hasUserInfo = userStore.initUserInfo()

        // 2. 如果已有完整的登录信息，直接跳过登录
        if (hasAuthInfo && hasUserInfo && userStore.isLoggedIn) {
            console.log('用户已登录，跳过登录流程')
            return true
        }

        // 3. 如果有认证信息但没有用户信息，只获取用户信息
        if (hasAuthInfo && !hasUserInfo) {
            // loadingText.value = '获取用户信息...'
            loadingText.value = '获取用户信息...'
            await userStore.fetchUserInfo()
            return true
        }

        // 4. 如果没有任何登录信息，执行无感登录
        if (!hasAuthInfo) {
            // loadingText.value = '正在登录...'
            loadingText.value = '加载中...'
            await userStore.login()

            // 登录成功后获取用户信息
            loadingText.value = '加载中...'
            await userStore.fetchUserInfo()
        }

        return true
    }
    catch (error) {
        console.error('登录流程失败:', error)
        // 登录失败时，仍然允许用户访问页面（可能是网络问题）
        return false
    }
}

async function init() {
    try {
        await smartLogin()
    }
    catch (error) {
        console.error('初始化失败:', error)
    }
    finally {
        isLoading.value = false
    }
}

onMounted(async () => {
    await init()
})
</script>

<style scoped lang="scss">
.main {
    min-height: 100vh;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.loading-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid #333;
    border-top: 4px solid #ffd700;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-text {
    color: #ffd700;
    font-size: 18px;
    font-weight: 500;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.bottom-nav {
    --van-tabbar-background: #000;
    --van-tabbar-item-active-color: #e4b857;
    --van-tabbar-item-inactive-color: #a3a3a3;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    bottom: 0;
    z-index: 1000;
    left: 50%;
    height: 209px;
    background: #1a1a1a;
    width: 100%;
    max-width: 1080px;
    transform: translateX(-50%);

    .nav-icon {
        width: 85px;
        height: 85px;
        margin-bottom: 8px;
    }

    .van-tabbar-item {
        padding: 35px 0 40px;
        color: #e4b857;
    }

    &::after {
        display: none;
    }

    &::before {
        position: absolute;
        top: -8px;
        left: 50%;
        z-index: 9;
        display: block;
        width: 100%;
        height: 24px;
        background: url('/images/casino/line_gold.png') no-repeat;
        content: '';
        transform: translateX(-50%);
        background-size: 100% 24px;
    }
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    padding: 15px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: inherit;
}

.nav-item:hover {
    background: rgba(255, 215, 0, 0.1);
}

.nav-item.active {
    background: rgba(255, 215, 0, 0.2);
}

.nav-item span {
    color: #ffd700;
    font-size: 30px;
}

.text-gold {
    color: #ffd700;
    font-size: 12px;
}
</style>
