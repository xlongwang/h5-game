<template>
    <div>
        <!-- Header -->
        <!-- <div class="header flex items-center justify-between p-[20px]">
            <div class="user-info flex items-center gap-[4px] text-[50px]">
                <img src="/images/casino/avatar.png" alt="User Avatar" class="avatar">
                <div class="pl-[10px]">
                    <div class="font-bold pb-[5px]">usuario378716</div>
                    <div class="text-[40px]">ID:9339417222</div>
                </div>
            </div>
            <div class="flex items-center">
                <div class="text-icon-18 w-[68px] h-[68px] mr-[20px]">
                    <img src="/images/casino/18.png" alt="18">
                </div>
                <div class="balance text-gold text-[50px] font-bold">
                    0.00
                </div>
            </div>
        </div> -->
22223
        <!-- Bonus Banner -->
        <!-- <div class="bonus-banner flex items-center justify-between">
            <img src="/images/casino/a1.png" width="100%" height="100%" alt="Chip">
        </div> -->

        <!-- Ticker -->
        <!-- <div class="ticker flex items-center bg-black/20 px-[20px] py-[20px] text-xs">
            <div class="i-carbon-volume text-gold text-lg mr-[6px]"></div>
            <div class="marquee-container flex items-center justify-center flex-1 text-[40px] text-gold h-[80px] overflow-hidden">
                <div class="marquee-content line-4">
                    15 Retirar $3,000.00 Felicidades 9332437 Retirar $3,000.00
                </div>
            </div>
        </div> -->

        <!-- Game Tabs -->
        <!-- <van-tabs v-model:active="activeTabIndex" class="game-tabs" @change="handleTabChange">
            <van-tab v-for="(tab) in gameTabs" :key="tab.key" :title="tab.title">
                <template #title>
                    <div class="flex flex-col items-center">
                        <div v-if="tab.icon" class="text-2xl text-gold tab-icon" :class="[tab.key]">
                            <img :class="tab.key" :src="tab.icon" :alt="tab.title">
                        </div>
                        <span class="text-gold">{{ tab.title }}</span>
                    </div>
                </template>
            </van-tab>
        </van-tabs> -->

        <!-- Game Content with Swipe -->
        <!-- <van-swipe
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
                        </div>
                    </van-grid-item>
                </van-grid>
            </van-swipe-item>
        </van-swipe> -->
    </div>
</template>

// <script setup lang="ts">
// import { computed, ref, watch } from 'vue'

// import '@/assets/scss/pages/home.scss'

// defineOptions({
//     name: 'Home',
// })

// </script>

