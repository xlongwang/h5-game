<template>
    <div class="casino-page pb-[480px]">
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
                    ${{ amount.toFixed(2) || "0.00" }}
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
                    <div class="absolute top-[80px] left-[62px] w-[478px] h-full flex items-center justify-center">
                        <div class="text-[32px] text-[#f3d558]">{{ item.txt }}</div>
                    </div>
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
            <!-- pg -->
            <van-swipe-item>
                <div v-if="gamePGtLoading" class="loading-container">
                    <van-loading type="spinner" color="#ffd700" size="24px">
                        {{ t("common.loading") }}
                    </van-loading>
                </div>
                <van-grid
                    v-else
                    :column-num="3"
                    :gutter="16"
                    class="game-grid pt-[10px]"
                    :border="false"
                >
                    <van-grid-item v-for="game in gameList" :key="game.name">
                        <div class="game-card" @click="handleGameClick(game)">
                            <van-image :src="game.logo" :alt="game.name" />
                            <div v-if="game.show_name" class="game-name-container text-[#e4b857]">
                                <div class="game-name">{{ formatGameName(game.show_name)[0] }}</div>
                                <div v-if="formatGameName(game.show_name)[1]" class="game-name">
                                    {{ formatGameName(game.show_name)[1] }}
                                </div>
                            </div>
                        </div>
                    </van-grid-item>
                </van-grid>
            </van-swipe-item>
            <!-- jili -->
            <van-swipe-item>
                <div v-if="gameJLLoading" class="loading-container">
                    <van-loading type="spinner" color="#ffd700" size="24px">
                        {{ t("common.loading") }}
                    </van-loading>
                </div>
                <van-grid
                    v-else
                    :column-num="3"
                    :gutter="16"
                    class="game-grid pt-[10px]"
                    :border="false"
                >
                    <van-grid-item v-for="game in gameJLList" :key="game.name">
                        <div class="game-card" @click="handleGameClick(game)">
                            <van-image :src="game.logo" :alt="game.name" />
                            <div v-if="game.show_name" class="game-name-container text-[#e4b857]">
                                <div class="game-name">{{ formatJLGameName(game.show_name)[0] }}</div>
                                <div v-if="formatJLGameName(game.show_name)[1]" class="game-name">
                                    {{ formatJLGameName(game.show_name)[1] }}
                                </div>
                            </div>
                        </div>
                    </van-grid-item>
                </van-grid>
            </van-swipe-item>

            <!-- pp -->
            <van-swipe-item>
                <div v-if="gamePPLoading" class="loading-container">
                    <van-loading type="spinner" color="#ffd700" size="24px">
                        {{ t("common.loading") }}
                    </van-loading>
                </div>
                <van-grid
                    v-else
                    :column-num="3"
                    :gutter="16"
                    class="game-grid pt-[10px]"
                    :border="false"
                >
                    <van-grid-item v-for="game in gamePPList" :key="game.name">
                        <div class="game-card" @click="handleGameClick(game)">
                            <van-image :src="game.logo" :alt="game.name" />
                            <div v-if="game.show_name" class="game-name-container text-[#e4b857]">
                                <div class="game-name">{{ formatJLGameName(game.show_name)[0] }}</div>
                                <div v-if="formatJLGameName(game.show_name)[1]" class="game-name">
                                    {{ formatJLGameName(game.show_name)[1] }}
                                </div>
                            </div>
                        </div>
                    </van-grid-item>
                </van-grid>
            </van-swipe-item>

            <!-- job -->
            <van-swipe-item>
                <div v-if="gameJobLoading" class="loading-container">
                    <van-loading type="spinner" color="#ffd700" size="24px">
                        {{ t("common.loading") }}
                    </van-loading>
                </div>
                <van-grid
                    v-else
                    :column-num="3"
                    :gutter="16"
                    class="game-grid pt-[10px]"
                    :border="false"
                >
                    <van-grid-item v-for="game in gameJobList" :key="game.name">
                        <div class="game-card" @click="handleGameClick(game)">
                            <van-image :src="game.logo" :alt="game.name" />
                            <div v-if="game.show_name" class="game-name-container text-[#e4b857]">
                                <div class="game-name">{{ formatJLGameName(game.show_name)[0] }}</div>
                                <div v-if="formatJLGameName(game.show_name)[1]" class="game-name">
                                    {{ formatJLGameName(game.show_name)[1] }}
                                </div>
                            </div>
                        </div>
                    </van-grid-item>
                </van-grid>
            </van-swipe-item>

            <!-- mg -->
            <van-swipe-item>
                <div v-if="gameMGLoading" class="loading-container">
                    <van-loading type="spinner" color="#ffd700" size="24px">
                        {{ t("common.loading") }}
                    </van-loading>
                </div>
                <van-grid
                    v-else
                    :column-num="3"
                    :gutter="16"
                    class="game-grid pt-[10px]"
                    :border="false"
                >
                    <van-grid-item v-for="game in gameMGList" :key="game.name">
                        <div class="game-card" @click="handleGameClick(game)">
                            <van-image :src="game.logo" :alt="game.name" />
                            <div v-if="game.show_name" class="game-name-container text-[#e4b857]">
                                <div class="game-name">{{ formatJLGameName(game.show_name)[0] }}</div>
                                <div v-if="formatJLGameName(game.show_name)[1]" class="game-name">
                                    {{ formatJLGameName(game.show_name)[1] }}
                                </div>
                            </div>
                        </div>
                    </van-grid-item>
                </van-grid>
            </van-swipe-item>
        </van-swipe>

        <RechargPop ref="rechargPopRef" :on-success="handleRechargeSuccess" />

        <!-- 游戏 iframe 覆盖层 -->
        <Teleport to="body">
            <div v-if="gameIframeVisible" class="game-iframe-overlay">
                <div class="game-iframe-header">
                    <button class="close-btn" @click="closeGameIframe">
                        <van-icon name="cross" size="18" color="rgba(255, 255, 255, 0.7)" />
                    </button>
                </div>
                <iframe
                    v-if="gameIframeUrl"
                    ref="gameIframeRef"
                    :src="gameIframeUrl"
                    class="game-iframe"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            </div>
        </Teleport>

        <!-- 游戏加载状态 -->
        <van-overlay v-if="gameLoading" :show="true" class="game-loading-overlay">
            <div class="game-loading-content">
                <van-loading type="spinner" color="#ffd700" size="32px">
                    {{ t("common.loading") }}
                </van-loading>
            </div>
        </van-overlay>

    <!-- 订单详情弹窗 -->
    <!-- <OderDetail ref="orderDetailRef" :active-val="100" :on-success="handleOrderSuccess" /> -->
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import { getMarqueeData } from '@/config/marqueenConfig'
import { USER_REWARD } from '@/config/NumberConfig'
import useUserStore from '@/stores/use-user-store'

// import { formatNumber } from '@/utils/tools'

import '@/assets/scss/pages/home.scss'

interface GameInfo {
    logo: string
    name: string
    show_name: string
}

defineOptions({
    name: 'Home',
})

const userStore = useUserStore()

const { i18n } = useGlobal()
const { t } = i18n

const rechargPopRef = ref()
const activeTabIndex = ref(0)
const swipeRef = ref()
const gameIframeRef = ref<HTMLIFrameElement>()

const gameList = ref<GameInfo[]>([])
const gameJLList = ref<GameInfo[]>([])
const gamePPList = ref<GameInfo[]>([])
const gameJobList = ref<GameInfo[]>([])
const gameMGList = ref<GameInfo[]>([])

const gamePGtLoading = ref(false)
const gameJLLoading = ref(false)
const gamePPLoading = ref(false)
const gameJobLoading = ref(false)
const gameMGLoading = ref(false)
const gameIframeVisible = ref(false)
const gameIframeUrl = ref('')
const gameLoading = ref(false)

async function getGameList() {
    try {
        gamePGtLoading.value = true
        const res = await userApi.getGameList({
            type: 'fortune',
        })
        gameList.value = res.data
    }
    catch (error) {
        console.error('获取游戏列表失败:', error)
    }
    finally {
        gamePGtLoading.value = false
    }
}

async function getGameJLList() {
    try {
        gameJLLoading.value = true
        const res = await userApi.getGameList({
            type: 'JILI',
        })
        gameJLList.value = res.data
    }
    catch (error) {
        console.error('获取游戏列表失败:', error)
    }
    finally {
        gameJLLoading.value = false
    }
}

async function getGamePPList() {
    try {
        gamePPLoading.value = true
        const res = await userApi.getGameList({
            type: 'PP',
        })
        gamePPList.value = res.data
    }
    catch (error) {
        console.error('获取游戏列表失败:', error)
    }
    finally {
        gamePPLoading.value = false
    }
}

async function getGameJobList() {
    try {
        gameJobLoading.value = true
        const res = await userApi.getGameList({
            type: 'JOB',
        })
        gameJobList.value = res.data
    }
    catch (error) {
        console.error('获取游戏列表失败:', error)
    }
    finally {
        gameJobLoading.value = false
    }
}

async function getGameMGList() {
    try {
        gameMGLoading.value = true
        const res = await userApi.getGameList({
            type: 'MG',
        })
        gameMGList.value = res.data
    }
    catch (error) {
        console.error('获取游戏列表失败:', error)
    }
    finally {
        gameMGLoading.value = false
    }
}

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

onMounted(async () => {
    console.log('userInfo', userInfo.value)
    // 每次进入页面重新生成随机数据
    marqueeTexts.value = getMarqueeData()
    await getGameList()
    await getGameJLList()
    await getGamePPList()
    await getGameJobList()
    await getGameMGList()

    // 监听来自 iframe 的消息
    window.addEventListener('message', handleIframeMessage)
})

onUnmounted(() => {
    // 清理事件监听器
    window.removeEventListener('message', handleIframeMessage)
})

const bannerImgs = computed(() => [
    {
        path: '/invite',
        img: '/images/promotion/a1.png',
        txt: `${t('banner.inviteFriends')} $${(userInfo.value?.invitation_reward || 0).toFixed(2)}`,
    },
    {
        path: '/activity02',
        img: '/images/promotion/a2.png',
        txt: `${t('banner.completeTask')} $${(USER_REWARD).toFixed(2)}`,
    },
    {
        path: '/activity01',
        img: '/images/promotion/a3.png',
        txt: t('banner.dailyLogin'),
    },
])

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

// 格式化游戏名称：驼峰转两个单词并换行
function formatGameName(name: string): string[] | string {
    if (!name)
        return ''
    // 驼峰命名转空格分隔
    const words = name.replace(/([A-Z])/g, ' $1').trim()
    // 如果只有一个单词，直接返回
    if (!words.includes(' '))
        return name
    // 取前两个单词，用换行符分隔
    const wordArray = words.split(' ')
    return wordArray
}
// 格式化游戏名称：空格分隔两个单词并换行
function formatJLGameName(name: string): string[] | string {
    if (!name)
        return ''
    // 驼峰命名转空格分隔
    // 如果只有一个单词，直接返回
    if (!name.includes(' '))
        return name
    // 取前两个单词，用换行符分隔
    const wordArray = name.split(' ')
    return wordArray
}

// 处理来自 iframe 的消息
function handleIframeMessage(event: MessageEvent) {
    console.log('🚀 ~ handleIframeMessage ~ event:', event)
    // 验证消息来源（可选，增加安全性）
    // if (event.origin !== 'https://expected-origin.com') return

    try {
        const { type, data } = event.data

        switch (type) {
            case 'gameClose':
                // iframe 请求关闭游戏
                closeGameIframe()
                break

            case 'gameError':
                // 游戏加载错误
                console.error('Game error:', data)
                closeGameIframe()
                break

            case 'gameLoaded':
                // 游戏加载完成
                console.log('Game loaded successfully')
                gameLoading.value = false
                break

            case 'gameAction':
                // 游戏中的操作（如投注、赢取等）
                console.log('Game action:', data)
                // 可以在这里处理游戏相关的业务逻辑
                break

            case 'userBalance':
                // 更新用户余额
                if (data && typeof data.balance === 'number') {
                    // 可以在这里更新用户余额显示
                    console.log('Balance updated:', data.balance)
                }
                break

            default:
                console.log('Unknown message type:', type, data)
        }
    }
    catch (error) {
        console.error('Error handling iframe message:', error)
    }
}

function handleRecharge() {
    rechargPopRef.value.open()
}

async function handleGameClick(game: GameInfo) {
    console.log('game', game)
    try {
        gameLoading.value = true
        // 调用游戏登录接口
        const result = await userApi.gameLogin({
            game_name: game.name,
            player_id: userInfo.value?.id || 0,
        })
        if (result.code === 200 && result.data) {
            gameIframeUrl.value = result.data
            gameIframeVisible.value = true
        }
        else {
            console.error('获取游戏地址失败:', result.message)
        }
    }
    catch (error) {
        console.error('游戏登录失败:', error)
    }
    finally {
        gameLoading.value = false
    }
}

function closeGameIframe() {
    gameIframeVisible.value = false
    gameIframeUrl.value = ''
    userStore.fetchUserInfo()
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

.game-name-container {
  position: absolute;
  bottom: 19px;
  left: 0;
  right: 0;
  line-height: 1.1;
  font-size: 45px;
  width: 100%;
  text-align: center;
}

.game-name{
    font-weight: 600;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    font-style: italic;
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

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 650px;
  color: #ffd700;
  font-size: 16px;
}

/* 游戏 iframe 覆盖层样式 */
.game-iframe-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.game-iframe-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  z-index: 10000;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* 游戏加载状态样式 */
.game-loading-overlay {
  z-index: 10001;
}

.game-loading-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #ffd700;
  font-size: 18px;
}
</style>
