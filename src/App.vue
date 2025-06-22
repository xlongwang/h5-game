<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-22 12:39:15
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
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
        <!-- Bottom Navigation -->
        <van-tabbar v-model="activeNav" class="bottom-nav" route>
            <van-tabbar-item v-for="item in navItems" :key="item.name" :to="item.to" :name="item.name">
                <span>{{ item.name }}</span>
                <template #icon="props">
                    <img :src="props.active ? item.activeIcon : item.inactiveIcon">
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
    name: 'AppRoot',
})

const activeNav = ref('Casino')

const navItems = ref([
    { name: 'Casino', to: '/casino', activeIcon: '/images/casino/nav-casino-active.png', inactiveIcon: '/images/casino/nav-casino-inactive.png' },
    { name: 'Promoción', to: '/promotion', activeIcon: '/images/casino/nav-promo-active.png', inactiveIcon: '/images/casino/nav-promo-inactive.png' },
    { name: 'Retirar', to: '/retirar', activeIcon: '/images/casino/nav-retirar-active.png', inactiveIcon: '/images/casino/nav-retirar-inactive.png' },
    { name: 'Apoyo', to: '/apoyo', activeIcon: '/images/casino/nav-apoyo-active.png', inactiveIcon: '/images/casino/nav-apoyo-inactive.png' },
    { name: 'Perfil', to: '/perfil', activeIcon: '/images/casino/nav-perfil-active.png', inactiveIcon: '/images/casino/nav-perfil-inactive.png' },
])

const { globalStore } = useGlobal()

// pinia 状态管理 ===>
// const { globalLoading } = storeToRefs(globalStore)
// const tmpCount = computed(() => globalStore.counter)
// pinia 状态管理 <===

async function init() {
    setTimeout(() => {
        globalStore.setGlobalLoading(false)
    }, 200)
}

onMounted(async () => {
    init()
})
</script>
