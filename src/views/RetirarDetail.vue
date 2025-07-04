<template>
    <div class="retirar-detail-page">
        <header-back :has-back-icon="true" />
        <div class="retirar-detail-page-con">
            <div class="retirar-detail-page-con-bg">
                <div class="retirar-detail-page-c1">
                    <div class="retirar-detail-page-c1-item-title">
                        <span>Arvin</span>
                    </div>
                    <div class="retirar-detail-page-c1-item-content flex items-center gap-[12px]">
                        <div class="retirar-detail-page-c1-item-content-item w-[170px] h-[163px]">
                            <img :src="coin" alt="" class="w-full h-full">
                        </div>
                        <div class="text-[60px] text-gold font-bold">{{ getCoinNum(amount) }}</div>
                    </div>
                </div>

                <div class="retirar-detail-page-c2">
                    <div class="retirar-detail-page-c2-item-title text-[50px] pt-[30px] pb-[20px]">
                        {{ t('withdraw.withdrawalInProgress') }}
                    </div>
                    <div class="retirar_progress_container">
                        <div class="retirar_pro_box">
                            <div class="retirar_progress_inner" :style="{ width: `${percent * 100}%` }">
                                <div
                                    class="progess_txt"
                                    :style="{
                                        right: percent > 0.9 ? '0.2rem' : '-1.111111rem',
                                        color: percent > 0.9 ? '#190b00' : '#f2d458',
                                    }"
                                >
                                    {{ Math.floor(percent * 100) }}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="retirar-detail-log-container">
                    <div class="log_scroll_container text-[50px]">
                        <div class="retirar-detail-log-item">
                            <div class="retirar-detail-log-item-title line-clamp-3 line-height-[1.4]">
                                {{ t('withdraw.welcomeMessage') }}
                            </div>
                            <div class="time">2025-06-30 10:00:00</div>
                        </div>
                        <div class="retirar-detail-log-item">
                            <div class="retirar-detail-log-item-title line-clamp-3 line-height-[1.4]">
                                {{ t('withdraw.welcomeMessage') }}
                            </div>
                            <div class="time">2025-06-30 10:00:00</div>
                        </div>
                        <div class="retirar-detail-log-item">
                            <div class="retirar-detail-log-item-title line-clamp-3 line-height-[1.4]">
                                {{ t('withdraw.welcomeMessage') }}
                            </div>
                            <div class="time">2025-06-30 10:00:00</div>
                        </div>
                    </div>
                </div>

                <div class="retirar-btn text-[50px] font-bold" @click="submit">
                    {{ t('withdraw.useVIPChannel') }}
                </div>
                <!-- 使用 VIP 渠道提款 -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import { getCoinNum } from '@/utils'
import { StorageUtil } from '@/utils/storage'

defineOptions({
    name: 'RetirarDetailPage',
})

const { userStore, i18n } = useGlobal()
const { t } = i18n
const route = useRoute()

// 获取URL参数中的amount
const amount = computed(() => {
    const amountParam = route.query.amount
    return amountParam ? Number(amountParam) : 5000
})

const percent = ref(Math.random() * 0.9 + 0.1)

// const timer = setInterval(() => {
//   percent.value += 0.1;
//   if (percent.value >= 1) {
//     percent.value = 1;
//     clearInterval(timer);
//   }
// }, 500);

const userInfo = computed(() => {
    return StorageUtil.getUserInfo()
})

async function submit() {
    console.log('userInfo', userInfo.value)
    console.log('amount', amount.value)
    const result = await userApi.createPayout({
        amount: amount.value.toString(),
        phone: userInfo.value?.receiving_account?.phone,
        pix_type: 'PHONE', // PHONE、EMAIL、CPF。
        player_id: userInfo.value?.id,
        receiving_account: userInfo.value?.receiving_account?.receiving_account,
        receiving_name: userInfo.value?.receiving_account?.receiving_name,
    })
    console.log('result', result)
}

onMounted(() => {
    console.log('userInfo', userInfo.value)
})

const coin = '/images/retirar/coin.png'
</script>

<style scoped lang="scss">
.retirar-detail-page {
  padding: 0 10px 300px;
}

.retirar-detail-page-con {
  width: 1037px;
  height: 1478px;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 80px 65px 0;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/images/retirarDetail/border.png") no-repeat center center;
    background-size: contain;
    z-index: 5;
    pointer-events: none;
  }
}

.retirar-detail-page-c1 {
  width: 901px;
  height: 331px;
  background: url("/images/retirarDetail/c1.png") no-repeat center center;
  background-size: 100% 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  box-sizing: border-box;
  padding: 0 14px 0;
  &-item-title {
    padding: 0 20px;
    height: 102px;
    line-height: 102px;
    font-size: 50px;
    text-align: left;
  }
}

.retirar_progress_container {
  width: 901px;
  height: 80px;
  background: url("/images/retirarDetail/pro_bg.png") no-repeat center center;
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.retirar_pro_box {
  width: 844px;
  height: 55px;
  position: relative;
}

.progess_txt {
  position: absolute;
  right: -120px;
  font-size: 50px;
  color: #190b00;
  height: 55px;
  line-height: 55px;
}

.retirar_progress_inner {
  // width: 104px;
  height: 55px;
  background: repeating-linear-gradient(
    120deg,
    #ffe066 0 20px,
    #ffe066 20px 40px,
    #e6c200 40px 60px,
    #e6c200 60px 80px
  );
  background-size: 110px 100%;
  animation: progress-stripes 1s linear infinite;
  border-radius: 10px;
  box-shadow: 0 2px 8px #e6c20033;
  position: relative;
  transition: width 0.3s ease-in-out;
}

@keyframes progress-stripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 110px 0;
  }
}

.retirar-detail-log-container {
  width: 901px;
  height: 621px;
  border: 3px solid #b8841e;
  border-radius: 15px;
  background-color: #190b00;
  box-sizing: border-box;
  padding: 30px;
  position: relative;
  margin: 42px auto 0;
}

.log_scroll_container {
  overflow-y: auto;
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
}

.retirar-detail-log-item {
  padding-bottom: 30px;
}

.retirar-btn {
  width: 909px;
  height: 116px;
  background: url("/images/retirarDetail/btn.png") no-repeat center center;
  background-size: 100% 100%;
  margin: 45px auto 0;
  line-height: 116px;
  text-align: center;
  color: #250d00;
}
</style>
