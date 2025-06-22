<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 11:29:02
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-22 13:13:34
 * @FilePath: /vue3_app/src/views/Casino.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="casino-page pb-20">
        <!-- Header -->
        <div class="header flex items-center justify-between p-[20px]">
            <div class="user-info flex items-center gap-[4px] text-[20px]">
                <img src="/images/casino/avatar.png" alt="User Avatar" class="avatar">
                <div class="pl-[10px]">
                    <div class="font-bold text-white pb-[5px]">usuario378716</div>
                    <div>ID:9339417</div>
                </div>
            </div>
            <div class="flex items-center">
                <div class="text-icon-18 mr-[15px]">
                    <img src="/images/casino/18.png" alt="18">
                </div>
                <div class="balance text-gold text-[30px] font-bold">
                    0.00
                </div>
            </div>
        </div>

        <!-- Bonus Banner -->
        <div class="bonus-banner flex items-center justify-between">
            <img src="/images/casino/a1.png" width="100%" height="100%" alt="Chip">
        </div>

        <!-- Ticker -->
        <div class="ticker flex items-center bg-black/20 px-4 py-2 text-xs">
            <div class="i-carbon-volume-up text-gold text-lg mr-2"></div>
            <marquee class="flex-1" behavior="scroll" direction="left">
                15 Retirar $3,000.00 Felicidades 9332437 Retirar $3,000.00
            </marquee>
        </div>

        <!-- Game Tabs -->
        <van-tabs v-model:active="activeTab" class="game-tabs" line-width="20">
            <van-tab v-for="tab in gameTabs" :key="tab.key" :title="tab.title">
                <template #title>
                    <div class="flex flex-col items-center">
                        <div v-if="tab.icon" class="text-2xl" :class="[tab.icon, { 'text-gold': activeTab === tab.key }]"></div>
                        <span class="mt-1">{{ tab.title }}</span>
                    </div>
                </template>
            </van-tab>
        </van-tabs>

        <!-- Game Grid -->
        <van-grid :column-num="2" :gutter="16" class="game-grid p-4" :border="false">
            <van-grid-item v-for="game in games" :key="game.id">
                <div class="game-card">
                    <van-image :src="game.image" />
                    <div v-if="game.hot" class="hot-badge">HOT</div>
                </div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/scss/pages/casino.scss'

defineOptions({
    name: 'Casino',
})

const activeTab = ref(0)

const gameTabs = ref([
    { key: 'pg', title: 'PG', icon: 'i-carbon-logo-digg' },
    { key: 'jili', title: 'JILI' },
    { key: 'pp', title: 'PP', icon: 'i-carbon-star-filled' },
    { key: 'job', title: 'JOB', icon: 'i-carbon-flow-data' },
    { key: 'mg', title: 'MG', icon: 'i-carbon-network-4' },
])

const games = ref([
    { id: 1, image: '/images/casino/game-pig-1.png', hot: true },
    { id: 2, image: '/images/casino/game-pig-2.png' },
    { id: 3, image: '/images/casino/game-cat-1.png' },
    { id: 4, image: '/images/casino/game-pig-3.png' },
    { id: 5, image: '/images/casino/game-pig-4.png' },
    { id: 6, image: '/images/casino/game-cat-2.png' },
])
</script>
