<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-24 00:05:19
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

defineOptions({
    name: 'AppRoot',
})

const activeNav = ref('Casino')
const route = useRoute()

const navItems = ref([
    { name: 'Casino', to: '/', activeIcon: '/images/casino/home.png', inactiveIcon: '/images/casino/home.png' },
    { name: 'Promoción', to: '/promotion', activeIcon: '/images/casino/gift.png', inactiveIcon: '/images/casino/gift.png' },
    { name: 'Retirar', to: '/retirar', activeIcon: '/images/casino/coin_b.png', inactiveIcon: '/images/casino/coin_b.png' },
    { name: 'Apoyo', to: '/apoyo', activeIcon: '/images/casino/serve.png', inactiveIcon: '/images/casino/serve.png' },
    { name: 'Perfil', to: '/perfil', activeIcon: '/images/casino/person.png', inactiveIcon: '/images/casino/person.png' },
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

<style scoped lang="scss">
 .main {
    min-height: 100vh;
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

// .bottom-nav {
//     position: fixed;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     background: #1a1a1a;
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     padding: 10px 0;
//     border-top: 1px solid #333;
//     z-index: 1000;
// }

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
