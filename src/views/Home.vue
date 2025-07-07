<template>
    <div class="casino-page pb-[280px]">
        <!-- Header -->
        <div class="header flex items-center justify-between pt-[20px] pb-[20px]">
            <div class="user-info flex items-center gap-[4px] text-[50px]">
                <img src="/images/casino/avatar.png" alt="User Avatar" class="avatar">
                <div class="pl-[10px]">
                    <div class="font-bold pb-[5px] max-w-[230px] truncate text-[40]">
                        {{ userInfo?.name || "User" }}
                        <!-- p_x7g9m -->
                    </div>
                    <div class="text-[40px] font-bold pt-[8px]">
                        {{ t("user.id") }}: {{ userInfo?.id || "N/A" }}
                    </div>
                </div>
            </div>
            <div class="flex items-center">
                <div class="text-icon-18 w-[68px] h-[68px] mr-[20px]">
                    <img src="/images/casino/18.png" alt="18">
                </div>
                <div class="balance relative text-gold text-[50px] font-bold">
                    ${{
                        amount.toFixed(2) || "0.00"
                    }}
                    <span class="recharge_entry" @click="handleRecharge"></span>
                </div>
            </div>
        </div>

        <!-- Bonus Banner -->
        <div class="bonus-banner flex items-center justify-between">
            <van-swipe
                class="w-full h-full"
                :autoplay="3000"
                indicator-color="#fff"
                :show-indicators="true"
                :loop="true"
            >
                <van-swipe-item
                    v-for="(item, idx) in bannerImgs"
                    :key="idx"
                    @click="handleClick(item.path)"
                >
                    <img :src="item.img" alt="" class="w-full h-full object-cover">
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- Ticker -->
        <div class="ticker flex items-center w-[1000px] mx-auto py-[20px] text-xs">
            <div class="i-carbon-volume text-gold text-lg mr-[6px]"></div>
            <div
                class="marquee-container flex items-center justify-center flex-1 text-[40px] text-gold h-[80px]"
            >
                <div class="marquee-content">
                    <span v-for="item in marqueeTexts" :key="item.id" class="mr-[20px]">
                        {{ t("withdraw.congratulations")
                        }}<span class="text-[#fff] pl-[10px] pr-[20px]">{{ item.id }}</span>{{ t("finance.withdraw")
                        }}<span class="text-[#f00] pl-[10px] pr-[10px]">{{ item.amount }}</span>
                    </span>
                    <span v-for="item in marqueeTexts" :key="`${item.id}-copy`" class="mr-[20px]">
                        {{ t("withdraw.congratulations")
                        }}<span class="text-[#fff] pl-[10px] pr-[20px]">{{ item.id }}</span>{{ t("finance.withdraw")
                        }}<span class="text-[#f00] pl-[10px] pr-[10px]">{{ item.amount }}</span>
                    </span>
                </div>
            </div>
        </div>

        <!-- Game Tabs -->
        <van-tabs v-model:active="activeTabIndex" class="game-tabs" @change="handleTabChange">
            <van-tab v-for="tab in gameTabs" :key="tab.key" :title="tab.title">
                <template #title>
                    <div class="flex flex-col items-center">
                        <div v-if="tab.icon" class="text-2xl text-gold tab-icon" :class="[tab.key]">
                            <img :class="tab.key" :src="tab.icon" :alt="tab.title">
                        </div>
                        <span class="text-gold text-[40px]">{{ tab.title }}</span>
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
                <van-grid
                    :column-num="3"
                    :gutter="16"
                    class="game-grid pt-[10px]"
                    :border="false"
                >
                    <van-grid-item v-for="game in getGamesByProvider(tab.key)" :key="game.id">
                        <div class="game-card">
                            <van-image :src="game.image" />
                        </div>
                    </van-grid-item>
                </van-grid>
            </van-swipe-item>
        </van-swipe>

        <RechargPop ref="rechargPopRef" :on-success="handleRechargeSuccess" />

        <!-- 添加测试按钮 -->
        <!-- <div class="test-section">
            <van-button type="primary" @click="showOrderDetail">测试订单详情弹窗</van-button>
        </div> -->

        <!-- 订单详情弹窗 -->
        <OderDetail ref="orderDetailRef" :active-val="100" :on-success="handleOrderSuccess" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGlobal } from '@/composables'
import { getMarqueeData } from '@/config/marqueenConfig'
import useUserStore from '@/stores/use-user-store'

// import { formatNumber } from '@/utils/tools'

import '@/assets/scss/pages/home.scss'

defineOptions({
    name: 'Home',
})

const userStore = useUserStore()

const { i18n } = useGlobal()
const { t } = i18n

const rechargPopRef = ref()
const activeTabIndex = ref(0)
const swipeRef = ref()
const orderDetailRef = ref()

const router = useRouter()

const userInfo = computed(() => {
    return userStore.userInfo
})

const amount = computed(() => {
    return Number(userInfo.value?.wallet?.balance) + Number(userInfo.value?.wallet?.bonus)
})

function handleRechargeSuccess() {
    console.log('handleRechargeSuccess')
    userStore.fetchUserInfo()
}

// watch(userInfo, (newVal, oldVal) => {
//     console.log('userInfo changed to:', newVal)
// })

// 生成随机跑马灯数据
const marqueeTexts = ref(getMarqueeData())

onMounted(() => {
    console.log('userInfo', userInfo.value)
    // 每次进入页面重新生成随机数据
    marqueeTexts.value = getMarqueeData()
})

const bannerImgs = [
    {
        path: '/invite',
        img: '/images/promotion/a1.png',
    },
    {
        path: '/activity02',
        img: '/images/promotion/a2.png',
    },
    {
        path: '/activity01',
        img: '/images/promotion/a3.png',
    },
]

function handleClick(path: string) {
    router.push(path)
}

const gameTabs = ref([
    { key: 'pg', title: 'PG', icon: '/images/casino/bg.png' },
    { key: 'jili', title: 'JILI', icon: '/images/casino/pg.png' },
    { key: 'pp', title: 'PP', icon: '/images/casino/star.png' },
    { key: 'job', title: 'JOB', icon: '/images/casino/coin.png' },
    { key: 'mg', title: 'MG', icon: '/images/casino/mg.png' },
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

function handleRecharge() {
    rechargPopRef.value.open()
}

// 处理滑动切换
function handleSwipeChange(index: number) {
    activeTabIndex.value = index
}

// 显示订单详情弹窗
function showOrderDetail() {
    orderDetailRef.value?.open()
}

// 订单成功回调
function handleOrderSuccess() {
    console.log('订单支付成功！')
    // 这里可以添加成功后的逻辑，比如刷新用户余额等
}
</script>

<style scoped>
.game-swipe-container {
  min-height: calc(100vh - 1400px);
  overflow: hidden;
  margin-top: 15px;
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

:deep(.van-swipe__indicators) {
  bottom: 50px !important;
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

/* Marquee 动画 */
.marquee-container {
  position: relative;
  white-space: nowrap;
  overflow: hidden;
}

.marquee-content {
  display: inline-block;
  animation: marquee 40s linear infinite;
  white-space: nowrap;
  padding-right: 50px;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 鼠标悬停暂停动画 */
.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}

.test-section {
  margin-top: 2rem;
}

.test-section .van-button {
  font-size: 1.2rem;
  padding: 12px 24px;
  border-radius: 8px;
}
</style>
