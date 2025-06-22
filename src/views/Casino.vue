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
        <div class="ticker flex items-center bg-black/20 px-[20px] py-[20px] text-xs">
            <div class="i-carbon-volume text-gold text-lg mr-[6px]"></div>
            <marquee class="flex-1 text-[20px] text-gold" behavior="scroll" direction="left">
                15 Retirar $3,000.00 Felicidades 9332437 Retirar $3,000.00
            </marquee>
        </div>

        <!-- Game Tabs -->
        <van-tabs v-model:active="activeTabIndex" class="game-tabs" @change="handleTabChange">
            <van-tab v-for="(tab) in gameTabs" :key="tab.key" :title="tab.title">
                <template #title>
                    <div class="flex flex-col items-center">
                        <!-- { 'text-gold': activeTabIndex === index } -->
                        <div v-if="tab.icon" class="text-2xl text-gold" :class="[tab.icon]">
                            <img :class="tab.key" :src="tab.icon" :alt="tab.title">
                        </div>
                        <span class="text-gold">{{ tab.title }}</span>
                    </div>
                </template>
            </van-tab>
        </van-tabs>

        <!-- Game Content with Swipe -->
        <van-swipe
            ref="swipeRef"
            v-model:active="activeTabIndex"
            class="game-swipe-container"
            :show-indicators="false"
            @change="handleSwipeChange"
        >
            <van-swipe-item v-for="tab in gameTabs" :key="tab.key">
                <van-grid :column-num="3" :gutter="16" class="game-grid pt-[10px]" :border="false">
                    <van-grid-item v-for="game in getGamesByProvider(tab.key)" :key="game.id">
                        <div class="game-card">
                            <van-image :src="game.image" />
                            <div v-if="game.hot" class="hot-badge">HOT</div>
                        </div>
                    </van-grid-item>
                </van-grid>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import '@/assets/scss/pages/casino.scss'

defineOptions({
    name: 'Casino',
})

const activeTabIndex = ref(0)
const swipeRef = ref()

const gameTabs = ref([
    { key: 'pg', title: 'PG2', icon: '/images/casino/bg.png' },
    { key: 'jili', title: 'JILI', icon: '/images/casino/pg.png' },
    { key: 'pp', title: 'PP', icon: '/images/casino/star.png' },
    { key: 'job', title: 'JOB', icon: '/images/casino/coin.png' },
    { key: 'mg', title: 'MG', icon: '/images/casino/coin.png' },
])

const games = ref([
    { id: 1, image: '/images/casino/active1.png', hot: true, provider: 'pg' },
    { id: 2, image: '/images/casino/active2.png', provider: 'pg' },
    { id: 3, image: '/images/casino/active3.png', hot: true, provider: 'pg' },
    { id: 4, image: '/images/casino/active1.png', provider: 'pg' },
    { id: 5, image: '/images/casino/active2.png', hot: true, provider: 'pg' },
    { id: 6, image: '/images/casino/active3.png', provider: 'pg' },
    { id: 7, image: '/images/casino/active1.png', hot: true, provider: 'pg' },
    { id: 8, image: '/images/casino/active2.png', provider: 'pg' },
    { id: 9, image: '/images/casino/active3.png', provider: 'pg' },
    { id: 3, image: '/images/casino/active3.png', provider: 'jili' },
    { id: 4, image: '/images/casino/active1.png', provider: 'jili' },
    { id: 2, image: '/images/casino/active2.png', provider: 'jili' },
    { id: 5, image: '/images/casino/active1.png', provider: 'pp' },
    { id: 6, image: '/images/casino/active2.png', provider: 'pp' },
    { id: 21, image: '/images/casino/active3.png', provider: 'pp' },
    { id: 7, image: '/images/casino/active3.png', provider: 'job' },
    { id: 8, image: '/images/casino/active1.png', provider: 'job' },
    { id: 22, image: '/images/casino/active2.png', provider: 'job' },
    { id: 9, image: '/images/casino/active1.png', provider: 'mg' },
    { id: 10, image: '/images/casino/active2.png', provider: 'mg' },
    { id: 14, image: '/images/casino/active3.png', provider: 'mg' },
])

// 根据游戏提供商筛选游戏
const getGamesByProvider = computed(() => (provider: string) => {
    return games.value.filter(game => game.provider === provider)
})

// 监听 activeTabIndex 变化
watch(activeTabIndex, (newIndex) => {
    console.log('activeTabIndex changed to:', newIndex)
})

// 处理标签切换
function handleTabChange(index: number) {
    activeTabIndex.value = index
    // 直接控制 swipe 切换到对应索引
    if (swipeRef.value) {
        console.log('swipeRef.value', swipeRef.value, index)
        swipeRef.value.swipeTo(index)
    }
}

// 处理滑动切换
function handleSwipeChange(index: number) {
    activeTabIndex.value = index
}
</script>

<style scoped>
.game-swipe-container {
    min-height: calc(100vh - 1400px);
    overflow: hidden;
}

.game-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.game-card:hover {
    transform: translateY(-2px);
}

.hot-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: linear-gradient(135deg, #ff4757, #ff3742);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 10px;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.3);
}

/* 优化标签样式 */
.game-tabs {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
}

:deep(.van-tabs__nav) {
    background: transparent;
}

:deep(.van-tab) {
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
}

:deep(.van-tab--active) {
    color: #ffd700;
    font-weight: bold;
}

:deep(.van-tabs__line) {
    background: linear-gradient(90deg, #ffd700, #ffed4e);
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

/* Swipe 样式优化 */
:deep(.van-swipe) {
    background: transparent;
}

:deep(.van-swipe__track) {
    background: transparent;
}

:deep(.van-swipe-item) {
    background: transparent;
}
</style>
