<template>
    <div class="retirar-detail-page">
        <header-back :has-back-icon="true" />
        <div class="retirar-detail-page-con">
            <div class="retirar-detail-page-con-bg">
                <div class="retirar-detail-page-c1">
                    <div class="retirar-detail-page-c1-item-title">
                        <span v-if="userInfo?.receiving_account?.receiving_name ">{{  userInfo?.receiving_account?.receiving_name }}</span>
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
                    <!-- {{ t('withdraw.useVIPChannel') }} -->{{ btnTxt }}
                </div>
                <!-- 使用 VIP 渠道提款 -->
            </div>
        </div>
        <RetairPop01 :retair-pop-02-ref="retairPop02Ref" ref="retairPop01Ref" />
        <RetairPop02  :recharge-ref="OderDetailRecargelRef" ref="retairPop02Ref" />

        <RetairPop03 ref="retairPop03Ref" :pop3Submit="pop3Submit" :retair-pop-04-ref="retairPop04Ref" submitInfo="submitInfo" :active-val="amount" />
        <RetairPop04 ref="retairPop04Ref" :pop4Submit="pop3Submit" :confirm-info="confirmInfo" />
        <RetairPop05 ref="retairPop05Ref" :set-prsonal-tax="setPrsonalTax" :amount="amount" :retair-pop-06-ref="retairPop06Ref" />
        <RetairPop06 ref="retairPop06Ref" :on-success="handlePaySuccess" :amount="amount" :tax="taxInfo"  :retair-pop-05-ref="retairPop05Ref" />
        <OderDetailRecharge
            ref="OderDetailRecargelRef"
            :active-val="200"
            :on-success="handleSuccess"
        />
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
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
const router = useRouter()
const btnTxt = ref(t('withdraw.useVIPChannel'))
const taxInfo = ref(0)

const retairPop01Ref = ref()
const retairPop02Ref = ref()
const retairPop03Ref = ref()
const retairPop04Ref = ref()
const retairPop05Ref = ref()
const retairPop06Ref = ref()
const OderDetailRecargelRef = ref()
const percent = ref(Math.random() * 0.2 + 0.4)

const step = ref(1)

const confirmInfo = ref({
  total: 0,
  coast: 0
})

// 获取URL参数中的amount
const amount = computed(() => {
    const amountParam = route.query.amount
    return amountParam ? Number(amountParam) : 5000
})

const handleSuccess = async () => {
  await userStore.fetchUserInfo()
  percent.value = 0.9
  retairPop02Ref.value.hide()
  step.value = 2
}

const submitInfo = (info: { total: number; coast: number }) => {
  console.log('submitInfo', info)
  confirmInfo.value = info
}

const setPrsonalTax = (tax: number) => {
  percent.value = 0.99
  taxInfo.value = tax
}

const handlePaySuccess = () => {
  percent.value = 1
  console.log('handlePaySuccess')
  router.push('/')
}

const pop3Submit = () => {
  console.log('pop3Submit')
  percent.value = 0.99
  step.value = 3
  btnTxt.value = 'Pagar impuestos personal'
}


const userInfo = computed(() => {
    return StorageUtil.getUserInfo()
})

const submit = () => {
  if(step.value === 1) {
    retairPop01Ref.value.open()
  } else if(step.value === 2) {
    retairPop03Ref.value.open()
  }else if(step.value === 3) {
    retairPop06Ref.value.open()
  }
}

// async function submit() {
//     console.log('userInfo', userInfo.value)
//     console.log('amount', amount.value)
//     const result = await userApi.createPayout({
//         amount: amount.value.toString(),
//         phone: userInfo.value?.receiving_account?.phone,
//         pix_type: 'PHONE', // PHONE、EMAIL、CPF。
//         player_id: userInfo.value?.id,
//         receiving_account: userInfo.value?.receiving_account?.receiving_account,
//         receiving_name: userInfo.value?.receiving_account?.receiving_name,
//     })
//     console.log('result', result)
// }

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
