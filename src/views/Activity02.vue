<template>
    <div class="activity01_page">
        <HeaderBack :has-back-icon="true" :title="t('activity.newUserTasks')" />
        <div class="activity01_content">
            <div class="act_header w-[1043px] h-[529px] mx-auto">
                <img class="w-[100%] h-[100%]" :src="headerImg" alt="">
                <div
                    class="absolute top-[100px] left-[42px] w-[478px] h-full flex items-center justify-center"
                >
                    <div class="text-[34px] text-[#f3d558]">{{ txt }}</div>
                </div>
            </div>

            <!-- 游戏收益列表 -->
            <div class="earnings-section w-[1046px] mx-auto mt-[43px]">
                <div class="section-title text-left text-[45px] text-[#f3d558] mb-[30px]">
                    {{ t("activity.gameEarnings") }}
                </div>

                <!-- 加载状态 -->
                <div v-if="loading" class="loading-container text-center py-[50px]">
                    <div class="loading-spinner"></div>
                    <div class="text-[40px] text-[#f3d558] mt-[60px]">
                        {{ t("common.loading") }}
                    </div>
                </div>

                <!-- 收益列表 -->
                <div v-else class="earnings-list text-[40px]">
                    <div
                        v-for="(gameData, gameName) in earningsData"
                        :key="gameName"
                        class="earnings-item"
                        :class="{ achieved: gameData.achieved, claimed: gameData.is_claimed }"
                    >
                        <div class="game-info">
                            <div class="game-name">{{ gameName }}</div>
                            <div class="progress-info">
                                <span class="progress-text">
                                    {{ gameData.count }}/{{ gameData.need }} {{ t("activity.times") }}
                                </span>
                                <div class="progress-bar">
                                    <div
                                        class="progress-fill"
                                        :style="{
                                            width: `${Math.min((gameData.count / gameData.need) * 100, 100)}%`,
                                        }"
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div class="game-status">
                            <div v-if="gameData.is_claimed" class="status-claimed">
                                {{ t("activity.claimed") }}
                            </div>
                            <div v-else-if="gameData.achieved" class="status-available">
                                <button
                                    class="claim-btn"
                                    :disabled="claiming"
                                    @click="claimReward(String(gameName))"
                                >
                                    {{ claiming ? t("common.loading") : t("activity.claim") }}
                                </button>
                            </div>
                            <div v-else class="status-locked">
                                {{ t("activity.notAchieved") }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 错误状态 -->
                <div v-if="error" class="error-container text-center py-[50px]">
                    <div class="text-[50px] text-red-400 mb-[20px]">{{ error }}</div>
                    <button class="retry-btn" @click="loadGameEarnings">
                        {{ t("common.retry") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GameEarningsData } from '@/types'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import { USER_REWARD } from '@/config/NumberConfig'

defineOptions({
    name: 'Activity02',
})
const { i18n } = useGlobal()
const { t } = i18n

const headerImg = computed(() => t('activity02.images.header'))
const txt = computed(
    () => `${t('activity02.completeTaskText')} $${USER_REWARD.toFixed(2)}`,
)

// 游戏收益相关状态
const loading = ref(false)
const claiming = ref(false)
const error = ref('')
const earningsData = ref<GameEarningsData>({} as GameEarningsData)

// 获取用户ID（这里需要根据实际情况获取）
function getPlayerId() {
    // 这里需要根据你的用户状态管理来获取player_id
    // 暂时返回一个示例值，你需要根据实际情况修改
    return '123'
}

// 加载游戏收益数据
async function loadGameEarnings() {
    try {
        loading.value = true
        error.value = ''

        const playerId = getPlayerId()
        const response = await userApi.getGameEarnings({ player_id: playerId })

        if (response.code === 200) {
            earningsData.value = response.data
            console.log('🚀 ~ loadGameEarnings ~ response.data:', response.data)
        }
        else {
            error.value = response.message || t('common.loadError')
        }
    }
    catch (err) {
        console.error('加载游戏收益失败:', err)
        error.value = t('common.loadError')
    }
    finally {
        loading.value = false
    }
}

// 领取奖励
async function claimReward(gameName: string) {
    try {
        claiming.value = true

        const playerId = getPlayerId()
        const response = await userApi.claimEarnings({
            game: gameName,
            player_id: playerId,
        })

        if (response.code === 200) {
            // 领取成功，重新加载数据
            await loadGameEarnings()
            // 这里可以添加成功提示
            console.log('领取成功:', response.data)
        }
        else {
            error.value = response.message || t('common.claimError')
        }
    }
    catch (err) {
        console.error('领取奖励失败:', err)
        error.value = t('common.claimError')
    }
    finally {
        claiming.value = false
    }
}

// 页面加载时获取游戏收益数据
onMounted(() => {
    loadGameEarnings()
})
</script>

<style lang="scss" scoped>
.activity01_page {
  padding-bottom: 300px;
}
.act_header {
  position: relative;
}
.act_btn {
  background: url("/images/activity/btn_bg.png") no-repeat center center;
  background-size: 100% 100%;
  font-size: 60px;
  font-weight: bold;
  color: #f3d658;
  color: #0c0701;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 游戏收益列表样式
.earnings-section {
  .section-title {
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
}

.loading-container {
  padding-top: 40px;
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3d558;
    border-top: 4px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.earnings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.earnings-item {
  // background: linear-gradient(
  //   135deg,
  //   rgba(243, 213, 88, 0.1) 0%,
  //   rgba(243, 213, 88, 0.05) 100%
  // );
  background: #231600;
  border: 3px solid #e69110;
  border-radius: 15px;
  padding: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(243, 213, 88, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(243, 213, 88, 0.2);
  }

  // &.achieved {
  //   border-color: rgba(76, 175, 80, 0.6);
  //   background: linear-gradient(
  //     135deg,
  //     rgba(76, 175, 80, 0.1) 0%,
  //     rgba(76, 175, 80, 0.05) 100%
  //   );
  // }

  &.claimed {
    // border-color: rgba(158, 158, 158, 0.6);
    // background: linear-gradient(
    //   135deg,
    //   rgba(158, 158, 158, 0.1) 0%,
    //   rgba(158, 158, 158, 0.05) 100%
    // );
    opacity: 0.7;
  }
}

.game-info {
  flex: 1;

  .game-name {
    font-size: 50px;
    font-weight: bold;
    color: #f3d558;
    margin-bottom: 15px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  .progress-info {
    .progress-text {
      font-size: 40px;
      color: #f3d558;
      margin-bottom: 10px;
      display: block;
    }

    .progress-bar {
      width: 500px;
      height:20px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid rgba(243, 213, 88, 0.3);

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #f3d558 0%, #ffeb3b 100%);
        border-radius: 6px;
        transition: width 0.5s ease;
        box-shadow: 0 0 10px rgba(243, 213, 88, 0.5);
      }
    }
  }
}

.game-status {
  display: flex;
  align-items: center;

  .status-claimed {
    font-size: 40px;
    color: #9e9e9e;
    font-weight: bold;
    line-height: 80px;
    text-align: center;
    height: 80px;
    width: 270px;
    background: rgba(158, 158, 158, 0.2);
    border-radius: 8px;
    border: 1px solid rgba(158, 158, 158, 0.4);
  }

  .status-locked {
    font-size: 40px;
    color: #ff6b6b;
    font-weight: bold;
    line-height: 80px;
    text-align: center;
    height: 80px;
    width: 270px;
    background: rgba(255, 107, 107, 0.2);
    border-radius: 8px;
    border: 1px solid rgba(255, 107, 107, 0.4);
  }

  .claim-btn {
    font-size: 40px;
    font-weight: bold;
    color: #0c0701;
    background: linear-gradient(135deg, #f3d558 0%, #ffeb3b 100%);
    border: none;
    border-radius: 8px;
    text-align: center;
    line-height: 80px;
    height: 80px;
    width: 270px;
    cursor: pointer;
    transition: all 0.3s ease;
    // box-shadow: 0 4px 15px rgba(243, 213, 88, 0.4);

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(243, 213, 88, 0.6);
      background: linear-gradient(135deg, #ffeb3b 0%, #f3d558 100%);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}

.error-container {
  .retry-btn {
    font-size: 46px;
    font-weight: bold;
    color: #0c0701;
    background: linear-gradient(135deg, #f3d558 0%, #ffeb3b 100%);
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(243, 213, 88, 0.6);
    }
  }
}
</style>
