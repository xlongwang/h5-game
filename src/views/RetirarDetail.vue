<template>
    <div class="retirar-detail-page">
        <header-back :has-back-icon="true" />
        <div class="retirar-detail-page-con">
            <div class="retirar-detail-page-con-bg">
                <div class="retirar-detail-page-c1">
                    <div class="retirar-detail-page-c1-item-title">
                        <span v-if="userInfo?.receiving_account?.receiving_name">{{
                            userInfo?.receiving_account?.receiving_name
                        }}</span>
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
                        {{ t("withdraw.withdrawalInProgress") }}
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
                    <div class="log_scroll_container text-[40px]">
                        <div
                            v-for="item in reversedProgressList"
                            :key="item.title"
                            class="retirar-detail-log-item"
                        >
                            <div class="retirar-detail-log-item-title line-clamp-3 line-height-[1.4]">
                                {{ t(item.description, { hours: curHours }) }}
                            </div>
                            <div class="time">{{ dayjs(item.time).format("YYYY-MM-DD HH:mm:ss") }}</div>
                        </div>
                    </div>
                </div>

                <!-- 倒计时显示 -->
                <div v-if="status === 'pending'" class="retirar-btn text-[50px] font-bold">
                    {{ formattedTimer }}
                </div>

                <div v-else class="retirar-btn text-[50px] font-bold" @click="submit">
                    <!-- {{ t('withdraw.useVIPChannel') }} -->{{ btnTxt }}
                </div>
                <!-- 使用 VIP 渠道提款 -->
            </div>
        </div>
        <RetairPop01
            ref="retairPop01Ref"
            :retair-pop-02-ref="retairPop02Ref"
            :on-success="handlePop1Success"
            :active-val="amount"
            :on-pop1-cancel="handlePop1Cancel"
            :set-hours="setHours"
        />
        <RetairPop02
            ref="retairPop02Ref"
            :active-val="amount"
            :on-success="handlePop2Success"
            @open-recharge="handleOpenRecharge"
        />

        <RetairPop03
            ref="retairPop03Ref"
            :pop3-submit="pop3Submit"
            :retair-pop-04-ref="retairPop04Ref"
            :submit-info="submitInfo"
            :active-val="amount"
            :on-success="handleSuccess"
            :recharge-ref="OderDetailRecargelRef"
        />
        <RetairPop04
            ref="retairPop04Ref"
            :pop4-submit="pop4Submit"
            :confirm-info="confirmInfo"
        />
        <RetairPop05
            ref="retairPop05Ref"
            :set-prsonal-tax="setPrsonalTax"
            :amount="amount"
            :retair-pop-06-ref="retairPop06Ref"
            :pop4-submit="pop4Submit"
        />
        <RetairPop06
            ref="retairPop06Ref"
            :retair-pop-07-ref="retairPop07Ref"
            :amount="amount"
            :tax="taxInfo"
            :retair-pop-05-ref="retairPop05Ref"
            :pop6-submit="handlePersonalTaxPaySuccess"
        />
        <RetairPop07
            ref="retairPop07Ref"
            :on-success="handlePop7Success"
            :amount="amount"
            :tax="taxInfo"
            :pop6-submit="pop6Submit"
        />
        <RetairPop08 ref="retairPop08Ref" :amount="amount" :pop8-submit="pop8Submit" />
        <RetairPop09
            ref="retairPop09Ref"
            key="pop9"
            :pop9-submit="pop9Submit"
            :amount="1000"
        />

        <RetairPop10 ref="retairPop10Ref" :pop10-submit="pop10Submit" />
        <OderDetailRecharge ref="OderDetailRecargelRef" :on-success="handleSuccess" />
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { showFailToast } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { userApi } from '@/api/user-api'

// import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'

// import { rechargAmountList } from '@/config/RechargeConfig'
import retarirProgress from '@/config/retairProgress'
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

const remainingSeconds = ref(0)
const timerInterval = ref<NodeJS.Timeout | null>(null)
const timeoutIds = ref<NodeJS.Timeout[]>([])

const timerCount = computed(() => {
    return remainingSeconds.value * 1000 // 转换为毫秒以保持兼容性
})

const retairPop01Ref = ref()
const retairPop02Ref = ref()
const retairPop03Ref = ref()
const retairPop04Ref = ref()
const retairPop05Ref = ref()
const retairPop06Ref = ref()
const retairPop07Ref = ref()
const retairPop08Ref = ref()
const retairPop09Ref = ref()
const retairPop10Ref = ref()
const OderDetailRecargelRef = ref()
const percent = ref(Math.random() * 0.2 + 0.4)

const progressTxtList = ref<Array<{ time: number, title: string, description: string }>>(
    [],
)

const step = ref(1)

const curHours = ref(0)

const confirmInfo = ref({
    total: 0,
    coast: 0,
})

const userInfo = computed(() => {
    return StorageUtil.getUserInfo()
})

// 获取URL参数中的amount
const amount = computed(() => {
    const amountParam = route.query.amount
    return amountParam ? Number(amountParam) : 5000
})
function setWithdrawPenddingStatus() {
    percent.value = 0.99
    step.value = 10
    handlePop9Success()
    progressTxtList.value = JSON.parse(localStorage.getItem('progressTxtList') || '[]')
}

const isWithdrawAmountPending = computed(() => {
    return Number(localStorage.getItem('withdrawAmount')) > 0
})

watch(isWithdrawAmountPending, (newVal) => {
    if (newVal) {
        setWithdrawPenddingStatus()
    }
})

async function handleSuccess() {
    await userStore.fetchUserInfo()
    if (step.value === 9) {
    // 支付 1000 元会计服务费 回调
        handlePop9Success()
        step.value = 10
    }
    else {
        percent.value = 0.99
        //   retairPop02Ref.value.hide();
        step.value = 4
    }
}

function setHours(hours: number) {
    curHours.value = hours
}

function submitInfo(info: { total: number, coast: number }) {
    console.log('submitInfo', info)
    confirmInfo.value = info
}

function setPrsonalTax(tax: number) {
    percent.value = 0.99
    taxInfo.value = tax
}

function handlePop1Success() {
    console.log('handlePop1Success=====')
    step.value = 2
}

function handlePop1Cancel() {
    console.log('handlePop1Cancel')
}

function handlePop2Success() {
    console.log('handlePop2Success=====')
    step.value = 3
}

function handleOpenRecharge(amount: number) {
    OderDetailRecargelRef.value.open()
    OderDetailRecargelRef.value.setActiveVal(amount)
}

const start_time = ref(0)
const end_time = ref(0)
const status = ref('')

// 格式化倒计时显示
const formattedTimer = computed(() => {
    const totalSeconds = Math.floor(timerCount.value / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

async function fetchapplyWithdrawal(isTimer = true) {
    try {
        const res = await userApi.applyWithdrawal({
        amount: amount.value.toString(),
        player_id: userInfo.value?.id.toString() || '',
    })
    if (res.code === 200) {
        start_time.value = res.data.now_time
        end_time.value = res.data.expire_time
        status.value = res.data.status
        btnTxt.value
      = status.value === 'confirmed' ? `${t('common.confirm')}` : formattedTimer.value

        //  btnTxt.value = formattedTimer.value
        if (isTimer) {
            startTimer()
        }
    }
    else {
        showFailToast(t('components.failed'))
    }
    }
    catch (error) {
        console.log('error', error)
        showFailToast(t('components.failed'))
        router.push('/retirar')
    }
}

const isFirstWithdraw = computed(() => {
    return Number(userInfo.value?.wallet?.total_withdraw) === 0
})

function handlePersonalTaxPaySuccess() {
    if (isFirstWithdraw.value) {
    // 第一次提现
        retairPop07Ref.value.open()
    }
    else {
        percent.value = 0.99
        step.value = 7
        btnTxt.value = t('components.payHighFinancialExpenses')
    }
}

// 开始倒计时
function startTimer() {
    if (timerInterval.value) {
        clearInterval(timerInterval.value)
    }

    // 计算初始剩余秒数
    if (start_time.value && end_time.value) {
        remainingSeconds.value = Math.max(0, end_time.value - start_time.value)
    }

    timerInterval.value = setInterval(() => {
        if (remainingSeconds.value > 0) {
            remainingSeconds.value--
        }
        else {
            stopTimer()
            // 可以在这里添加倒计时结束的处理逻辑
            console.log('倒计时结束')
        }
    }, 1000)
}

// 停止倒计时
function stopTimer() {
    if (timerInterval.value) {
        clearInterval(timerInterval.value)
        timerInterval.value = null
        const timeoutId = setTimeout(() => {
            fetchapplyWithdrawal(false)
        }, 1000)
        // 将timeoutId存储到ref中，以便在组件卸载时清理
        if (timeoutId) {
            timeoutIds.value.push(timeoutId)
        }
    }
}

async function handlePop9Success() {
    retairPop09Ref.value.hide()
    if (isFirstWithdraw.value) {
        if (progressTxtList.value.length === 7) { // 首次
            progressTxtList.value.push({
                ...retarirProgress[9],
                time: new Date().getTime(),
            })
        }
    }
    else
        if (progressTxtList.value.length === 8) {
            progressTxtList.value.push({
                ...retarirProgress[9],
                time: new Date().getTime(),
            })
        }
    await fetchapplyWithdrawal()
    const wAmount = localStorage.getItem('withdrawAmount')
    if (!wAmount) {
        nextTick(() => {
            localStorage.setItem('withdrawAmount', amount.value.toString())
            localStorage.setItem('progressTxtList', JSON.stringify(progressTxtList.value))
        })
    }
}

const pop7Timer = ref<NodeJS.Timeout | null>(null)

async function handlePop7Success() {
    await userStore.fetchUserInfo()
    pop7Timer.value = setTimeout(() => {
        router.push('/retirar')
    }, 1000)
}

function pop3Submit() {
    retairPop04Ref.value.open()
}

function pop4Submit() {
    console.log('pop4Submit')
    percent.value = 0.99
    step.value = 5
    btnTxt.value = t('components.payPersonalTaxes')
}

function pop6Submit() {
    console.log('pop6Submit')

    percent.value = 0.99
    step.value = 6
    btnTxt.value = t('components.payPersonalTaxes')
}

function pop8Submit() {
    console.log('pop8Submit')
    // percent.value = 1
    step.value = 8
    retairPop09Ref.value.open()
    // btnTxt.value = 'Pagar gastos financieros elevados'
}

function pop9Submit() {
    console.log('pop9Submit')
    step.value = 9

    OderDetailRecargelRef.value.open()
    OderDetailRecargelRef.value.setActiveVal(1000)
}

async function pop10Submit() {
    console.log('pop10Submit')
    step.value = 1
    percent.value = 0.99
    await userStore.fetchUserInfo()
    pop7Timer.value = setTimeout(() => {
        router.push('/retirar')
    }, 30)
}

const reversedProgressList = computed(() => {
    return [...progressTxtList.value].reverse()
})

watch(
    reversedProgressList,
    (newVal, oldVal) => {
        console.log('reversedProgressList', newVal, oldVal)
    },
    { deep: true },
)

async function submit() {
    console.log('submit=====', step.value)
    if (step.value < 4) {
        retairPop01Ref.value.open()
        return
    }

    if (step.value === 4) {
        console.log('🚀 ~ submit ~ isFirstWithdraw:', isFirstWithdraw.value)
        if (!isFirstWithdraw.value) {
            retairPop03Ref.value.open()
            return
        }

        retairPop05Ref.value.open()

        return
    }
    if (step.value === 5) {
        retairPop06Ref.value.open()
    }
    if (step.value === 7) {
        retairPop08Ref.value.open()
    }

    if (step.value === 8) {
        retairPop09Ref.value.open()
    }

    if (step.value === 10) {
        if (status.value === 'confirmed') {
            try {
                const res = await userApi.paymentConfirmation({
                    player_id: userInfo.value?.id.toString() || '',
                })
                if (res.code === 200) {
                    // showSuccessToast(t('components.success'))
                    localStorage.removeItem('withdrawAmount')
                    localStorage.removeItem('progressTxtList')
                    console.log('paymentConfirmation success', res.data)
                }
                else {
                    console.log('paymentConfirmation failed', res.data)
                }
            }
            catch (error) {
                console.log('error', error)
            }
            finally {
                retairPop10Ref.value.open()
            }
        }
    }
}

watch(step, (newVal) => {
    console.log('step', newVal)
    if (newVal === 2 && progressTxtList.value.length === 2) {
        progressTxtList.value.push({
            ...retarirProgress[3],
            time: new Date().getTime(),
        })
        progressTxtList.value.push({
            ...retarirProgress[4],
            time: new Date().getTime() + 2000,
        })
    }
    if (newVal === 3 && progressTxtList.value.length === 4) {
        if (!isFirstWithdraw.value) {
            progressTxtList.value.push({
                ...retarirProgress[5],
                time: new Date().getTime(),
            })
        }
    }
    if (newVal === 4) {
        if (isFirstWithdraw.value) {
            btnTxt.value = t('components.payPersonalTaxes')
            progressTxtList.value.push({
                ...retarirProgress[7],
                time: new Date().getTime() + 3000,
            })
        }
        else {
            btnTxt.value = t('components.payWithdrawalFee') // 支付取款手续费
        }
    }

    if (newVal === 5 && progressTxtList.value.length === 5) {
        if (!isFirstWithdraw.value) {
            progressTxtList.value.push({
                ...retarirProgress[6],
                time: new Date().getTime(),
            })
            progressTxtList.value.push({
                ...retarirProgress[7],
                time: new Date().getTime() + 3000,
            })
        }
    }
    if (newVal === 7) {
        if (!isFirstWithdraw.value) {
            if (progressTxtList.value.length === 6) {
                progressTxtList.value.push({
                    ...retarirProgress[8],
                    time: new Date().getTime(),
                })
            }
        }
        else if (progressTxtList.value.length === 7) {
            progressTxtList.value.push({
                ...retarirProgress[8],
                time: new Date().getTime(),
            })
        }
    }
})

onMounted(() => {
    if (isWithdrawAmountPending.value) {
        setWithdrawPenddingStatus()
    }
    else {
        const ct = new Date().getTime()
        progressTxtList.value = [
            {
                ...retarirProgress[1],
                time: ct,
            },
            {
                ...retarirProgress[2],
                time: ct + 3000,
            },
        ]
    }
})

onUnmounted(() => {
    if (pop7Timer.value) {
        clearTimeout(pop7Timer.value)
    }
    // 清理倒计时
    stopTimer()
    // 清理所有setTimeout
    if (timeoutIds.value) {
        timeoutIds.value.forEach(id => clearTimeout(id))
        timeoutIds.value = []
    }
})

const coin = '/images/retirar/coin.png'
// const extra = ref(0)
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

.time {
  padding-top: 10px;
}
</style>
