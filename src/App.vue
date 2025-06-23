<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-22 20:51:04
 * @FilePath: /vue3_app/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="main">
        <!-- <div class="header">
            <router-link to="/">HOME</router-link>
            <router-link to="/about">ABOUT</router-link>
        </div> -->
        <div class="body">
            <router-view v-slot="{ Component }" :key="$route.path">
                <component :is="Component" v-if="Component" />
            </router-view>
        </div>
        <!-- Bottom Navigation -->
        <div class="bottom-nav text-[30px] text-gold">
            <template v-for="item in navItems" :key="item.name">
                <!-- 内部路由使用 router-link -->
                <router-link
                    v-if="!item.isExternal"
                    :to="item.to"
                    class="nav-item"
                    :class="{ active: activeNav === item.name }"
                >
                    <img class="nav-icon" :src="activeNav === item.name ? item.activeIcon : item.inactiveIcon">
                    <span class="text-[30px]">{{ item.name }}</span>
                </router-link>
                <!-- 外部链接使用 a 标签 -->
                <a
                    v-else
                    :href="item.to"
                    target="_blank"
                    class="nav-item"
                    :class="{ active: activeNav === item.name }"
                >
                    <img class="nav-icon" :src="activeNav === item.name ? item.activeIcon : item.inactiveIcon">
                    <span class="text-[30px]">{{ item.name }}</span>
                </a>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({
    name: 'AppRoot',
})

const activeNav = ref('Casino')
const route = useRoute()

const navItems = ref([
    { name: 'Casino', to: '/', activeIcon: '/images/casino/home.png', inactiveIcon: '/images/casino/home.png', isExternal: false },
    { name: 'Promoción', to: '/promotion', activeIcon: '/images/casino/gift.png', inactiveIcon: '/images/casino/gift.png', isExternal: false },
    { name: 'Retirar', to: '/retirar', activeIcon: '/images/casino/coin_b.png', inactiveIcon: '/images/casino/coin_b.png', isExternal: false },
    { name: 'Apoyo', to: 'https://www.baidu.com', activeIcon: '/images/casino/serve.png', inactiveIcon: '/images/casino/serve.png', isExternal: true },
    { name: 'Perfil', to: '/perfil', activeIcon: '/images/casino/person.png', inactiveIcon: '/images/casino/person.png', isExternal: false },
])

const { globalStore } = useGlobal()

// 监听路由变化，同步 activeNav
watch(() => route.path, (newPath) => {
    const currentItem = navItems.value.find(item => item.to === newPath)
    if (currentItem && activeNav.value !== currentItem.name) {
        activeNav.value = currentItem.name
    }
}, { immediate: true })

async function init() {
    setTimeout(() => {
        globalStore.setGlobalLoading(false)
    }, 200)
}

onMounted(async () => {
    init()
})
</script>

<style scoped>
.main {
    min-height: 100vh;
    position: relative;
    width: 100% !important;
    max-width: none !important;
    min-width: none !important;
}

.body {
    padding-bottom: 80px; /* 为底部导航留出空间 */
    min-height: calc(100vh - 80px);
    height: 100vh !important; /* 覆盖全局 CSS */
    overflow-y:scroll !important; /* 覆盖全局 CSS */
    max-width: none !important; /* 覆盖全局 CSS */
    min-width: none !important; /* 覆盖全局 CSS */
    position: relative !important; /* 确保定位正确 */
    z-index: 1 !important; /* 确保层级正确 */
    width: 100% !important; /* 确保宽度正确 */
    left: 0 !important; /* 覆盖可能的定位 */
    right: 0 !important; /* 确保右边界 */
}

.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1a1a1a;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid #333;
    z-index: 1000;
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

<style>
/* 全局 CSS 重置，禁用可能影响布局的变量 */
:root {
    --body-width: 100% !important;
    --max-window: none !important;
    --min-window: none !important;
}
</style>
