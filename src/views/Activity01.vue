<template>
    <div class="activity01_page">
        <HeaderBack :has-back-icon="true" :title="t('activity.dailyBonus')" />
        <div class="activity01_content">
            <div class="act_header w-[1043px] h-[529px] mx-auto">
                <img class="w-[100%] h-[100%]" :src="headerImg" alt="">
                <div class="absolute top-[100px] left-[42px] w-[478px] h-full flex items-center justify-center">
                    <div class="text-[34px] text-[#f3d558]">{{ txt }}</div>
                </div>
            </div>

            <!-- Loading 状态 -->
            <div v-if="loading" class="loading_container">
                <div class="loading_spinner"></div>
                <div class="loading_text">{{ t("common.loading") }}</div>
            </div>

            <!-- 签到列表 -->
            <div v-else class="act_day_list">
                <div
                    v-for="item in rewardList"
                    :key="item.day"
                    class="act_day_item"
                    :class="{ active: currentDay === item.day }"
                >
                    <div class="act_day_item_title_top">DAY{{ item.day }}</div>
                    <div class="act_day_item_content pt-[36px]">
                        <div class="day_icon w-[174px] h-[168px] mx-[auto]">
                            <img :src="dayIconImg" class="w-[100%] h-[100%]">
                        </div>
                        <div class="act_day_item_num pt-[20px] pb-[20px]">
                            <!-- ${{ formatNumber(item.num) }} -->
                            ${{ formatNumber(Number(item.reward)) }}
                        </div>
                        <div
                            class="day_checkin"
                            :class="[item.status, { checking: checkInLoading === item.day }]"
                            @click="handleCheckIn(item)"
                        >
                            <div
                                v-if="checkInLoading === item.day"
                                class="checkin_loading_spinner"
                            ></div>
                            <span v-else>
                                {{
                                    item.status === "received"
                                        ? t("activity.alreadyCheckedIn")
                                        : t("activity.checkIn")
                                }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Reward, WeekSignInfoData } from '@/types'
import { showFailToast, showSuccessToast } from 'vant'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'
import { formatNumber } from '@/utils/tools'

defineOptions({
    name: 'Activity01',
})

const userStore = useUserStore()

const userInfo = computed(() => {
    return userStore.userInfo
})

const rewardList = ref<Reward[]>([])
const loading = ref(false)
const checkInLoading = ref<number | null>(null)

const signInfo = ref<WeekSignInfoData>()

const { i18n } = useGlobal()
const { t } = i18n

const headerImg = '/images/activity/a3.png'
const dayIconImg = '/images/activity/coin.png'
const txt = computed(() => t('activity01.dailyLoginText'))
const currentDay = ref(1)

async function getWeekSignInfo() {
    loading.value = true
    try {
        const res = await userApi.getWeekSignInfo({
            player_id: String(userInfo.value?.id || 0),
        })
        rewardList.value = res?.data?.rewards || []
        // currentDay.value = res?.data?.current_day || 1
        signInfo.value = res?.data

        currentDay.value = signInfo.value?.today || 1
    }
    catch (error) {
        console.error('获取签到信息失败:', error)
    }
    finally {
        loading.value = false
    }
}

async function handleCheckIn(item: Reward) {
    if (item.status === 'received' || checkInLoading.value === item.day) {
        return
    }

    if (item.status === 'locked') {
        return
    }
    // can_claim_reward_today
    if (!signInfo.value?.can_claim_reward_today) {
        showFailToast(t('activity.canNotCheckInTips'))
        return
    }

    checkInLoading.value = item.day
    try {
    // 调用签到奖励 API
        const res = await userApi.signReward({
            player_id: String(userInfo.value?.id || 0),
        })

        showSuccessToast(t('activity.checkInSuccess'))

        console.log('签到成功:', res.data)

        // 重新获取签到信息
        await getWeekSignInfo()
        await userStore.fetchUserInfo()
    }
    catch (error) {
        console.error('签到失败:', error)
    }
    finally {
        checkInLoading.value = null
    }
}

onMounted(() => {
    getWeekSignInfo()
})
</script>

<style lang="scss" scoped>
.activity01_page {
  padding-bottom: 300px;
}

.act_header{
    position: relative;
}

.loading_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 300px 0 0;
  gap: 20px;
}

.loading_spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(243, 214, 88, 0.2);
  border-top: 4px solid #f3d658;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading_text {
  font-size: 50px;
  color: #f3d658;
  font-weight: 500;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.act_day_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; // 这里改成flex-start
  gap: 56px 32px;
  padding-top: 30px;
  max-width: 1030px; // 宽度和头图一致
  margin: 0 auto;    // 整体居中
}
.act_day_item_title_top {
  height: 89px;
  font-weight: bold;
  font-size: 50px;
  line-height: 102px;
  text-align: center;
  color: #f3d658;
}
.act_day_item {
  width: 321px;
  height: 497px;
  font-size: 50px;
  text-align: center;
  background: url("/images/activity/day_bg_active.png") no-repeat center center;
  background-size: 100% 100%;
  &.active {
    background: url("/images/activity/day_bg.png") no-repeat center center;
    background-size: 100% 100%;
  }
}

.day_checkin {
  width: 257px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #f3d658;
  margin: 0 auto;
  border-radius: 10px;
  background: linear-gradient(135deg, #2a1a0a 0%, #1a0f05 100%);
  border: 3px solid #d4af37;
  //   border-image: linear-gradient(135deg, #f3d658 0%, #d4af37 50%, #f3d658 100%) 1;
  box-shadow: inset 0 1px 0 rgba(243, 214, 88, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.5),
    0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  opacity: 0.4;
  &.available {
    border: 3px solid #d4af37;
    opacity: 1;
    background: #d4af37;
    box-shadow: none;
    color: #2a1a0a;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    }
  }
  &.locked {
    background: rgb(90 90 90);
    color: rgba(255, 255, 255, 0.5);
    opacity: 1;
    box-shadow: none;
    border: 3px solid rgb(90 90 90);
  }

  &.checking {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

.checkin_loading_spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(42, 26, 10, 0.2);
  border-top: 2px solid #2a1a0a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
</style>
