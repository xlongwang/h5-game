<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-22 18:49:54
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
            <van-tabbar-item
                v-for="item in navItems"
                :key="item.name"
                :to="item.isExternal ? undefined : item.to"
                :name="item.name"
                @click="handleNavClick(item)"
            >
                <span class="text-gold">{{ item.name }}</span>
                <template #icon="props">
                    <img class="nav-icon" :src="props.active ? item.activeIcon : item.inactiveIcon">
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
    { name: 'Casino', to: '/', activeIcon: '/images/casino/home.png', inactiveIcon: '/images/casino/home.png', isExternal: false },
    { name: 'Promoción', to: '/promotion', activeIcon: '/images/casino/gift.png', inactiveIcon: '/images/casino/gift.png', isExternal: false },
    { name: 'Retirar', to: '/retirar', activeIcon: '/images/casino/coin_b.png', inactiveIcon: '/images/casino/coin_b.png', isExternal: false },
    { name: 'Apoyo', to: 'https://www.baidu.com', activeIcon: '/images/casino/serve.png', inactiveIcon: '/images/casino/serve.png', isExternal: true },
    { name: 'Perfil', to: '/perfil', activeIcon: '/images/casino/person.jpg', inactiveIcon: '/images/casino/person.png', isExternal: false },
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

function handleNavClick(item: { name: string, to: string, activeIcon: string, inactiveIcon: string, isExternal: boolean }) {
    if (item.isExternal) {
        window.open(item.to, '_blank')
    }
}
</script>
