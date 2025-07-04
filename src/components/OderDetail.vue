<template>
    <van-popup v-model:show="showCenter" round class="recharge_detail_popup">
        <div class="recharge_detail_content">
            <div class="peposito_de_title mx-auto mt-[50px]"></div>
            <div class="recharge_input text-[50px]">
                <div>{{ t('components.handlingFee') }}</div>
                <div class="text-[#f00]">${{ formatVal(activeVal) }}</div>
            </div>

            <!-- 订单状态显示 -->
            <div v-if="orderNo" class="order-status-section">
                <div class="order-info text-[32px] text-[#f3d559] mb-[20px]">
                    <span>{{ t('components.orderNumber') }}: {{ orderNo }}</span>
                </div>
                <div class="status-info text-[28px] text-[#fff] mb-[20px]">
                    <span>{{ t('components.orderStatus') }}: </span>
                    <span :class="getStatusClass(orderStatus)">{{ getStatusText(orderStatus) }}</span>
                </div>
                <div v-if="orderStatus === 'GENERATED'" class="loading-info text-[24px] text-[#999]">
                    {{ t('components.checkingPayment') }}...
                </div>
            </div>

            <div
                class="text-[37px] text-[#f3d559] px-[12px] line-height-[50px] pt-[37px] detait_re_txt"
            >
                <span class="dot_icon"></span>
                {{ t('components.payAccordingToOrder') }}
            </div>
            <div
                class="detai_re_btns px-[35px] pt-[60px] justify-between flex text-[40px] font-bold"
            >
                <div class="detai_re_cancel" @click="handleCancel">{{ t('components.cancel') }}</div>
                <div class="detai_re_submit" @click="handleSubmit">{{ t('components.goToPay') }}</div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import type { OrderStatus } from '@/types'
import { onUnmounted, ref } from 'vue'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    activeVal: number
    onSuccess: () => void
}>()

const { i18n } = useGlobal()
const { t } = i18n

const userStore = useUserStore()

const userInfo = computed(() => {
    return userStore.userInfo
})

function formatVal(val: number) {
    if (val > 20) {
        return val
    }
    return val.toFixed(2)
}

const showCenter = ref(false)
const orderNo = ref<string>('')
const orderStatus = ref<OrderStatus | ''>('')
const pollingTimer = ref<NodeJS.Timeout | null>(null)
const pollingInterval = 3000 // 3秒轮询一次
const maxPollingTime = 5 * 60 * 1000 // 最大轮询5分钟
const startPollingTime = ref<number>(0)

// 获取状态样式类
function getStatusClass(status: OrderStatus | ''): string {
    switch (status) {
        case 'SUCCESS':
            return 'text-[#52c41a]'
        case 'FAIL':
        case 'RETURN':
            return 'text-[#ff4d4f]'
        case 'GENERATED':
            return 'text-[#faad14]'
        default:
            return 'text-[#999]'
    }
}

// 获取状态文本
function getStatusText(status: OrderStatus | ''): string {
    switch (status) {
        case 'SUCCESS':
            return t('components.paymentSuccess')
        case 'FAIL':
            return t('components.paymentFailed')
        case 'RETURN':
            return t('components.paymentReturned')
        case 'GENERATED':
            return t('components.paymentPending')
        default:
            return t('components.unknownStatus')
    }
}

// 开始轮询订单状态
function startPollingOrderStatus(orderNumber: string) {
    orderNo.value = orderNumber
    orderStatus.value = 'GENERATED' as OrderStatus
    startPollingTime.value = Date.now()

    const pollOrderStatus = async () => {
        try {
            const result = await userApi.queryOrder({ order_no: orderNumber })
            console.log('轮询订单状态结果:', result)

            if (result.code === 200 && result.data) {
                orderStatus.value = result.data.status as OrderStatus

                // 如果订单成功，停止轮询并关闭弹窗
                if (result.data.status === 'SUCCESS') {
                    stopPolling()
                    setTimeout(() => {
                        showCenter.value = false
                        props.onSuccess()
                    }, 2000) // 2秒后关闭弹窗
                    return
                }

                // 如果订单失败或退回，停止轮询
                if (result.data.status === 'FAIL' || result.data.status === 'RETURN') {
                    stopPolling()
                    return
                }
            }

            // 检查是否超过最大轮询时间
            if (Date.now() - startPollingTime.value > maxPollingTime) {
                console.log('轮询超时，停止查询')
                stopPolling()
                return
            }

            // 继续轮询
            pollingTimer.value = setTimeout(pollOrderStatus, pollingInterval)
        }
        catch (error) {
            console.error('轮询订单状态失败:', error)
            // 出错时继续轮询
            pollingTimer.value = setTimeout(pollOrderStatus, pollingInterval)
        }
    }

    // 开始第一次轮询
    pollingTimer.value = setTimeout(pollOrderStatus, pollingInterval)
}

// 停止轮询
function stopPolling() {
    if (pollingTimer.value) {
        clearTimeout(pollingTimer.value)
        pollingTimer.value = null
    }
}

function handleCancel() {
    stopPolling()
    showCenter.value = false
    orderNo.value = ''
    orderStatus.value = ''
}

async function handleSubmit() {
    try {
        const result = await userApi.createPayin({
            amount: props.activeVal.toString(),
            player_id: userInfo.value?.id?.toString() || '',
        })
        console.log('🚀 ~ handleSubmit ~ result:', result)

        if (result.code === 200 && result.data?.order_no) {
            // 开始轮询订单状态
            startPollingOrderStatus(result.data.order_no)
        }
        else {
            console.error('创建订单失败:', result)
        }
    }
    catch (error) {
        console.error('提交订单失败:', error)
    }
}

function open() {
    showCenter.value = true
    orderNo.value = ''
    orderStatus.value = ''
}

// 组件卸载时清理定时器
onUnmounted(() => {
    stopPolling()
})

defineExpose({
    open,
})
</script>

<style lang="scss" scoped>
.recharge_detail_popup {
  width: 1000px;
  height: 750px;
  padding: 22px 14px;
  box-sizing: border-box;
  border-radius: 20px;
  background: transparent;
  &::after {
    width: 1000px;
    height: 750px;
    background: url("/images/main/border.png") no-repeat;
    background-size: contain;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    pointer-events: none;
  }
}
.recharge_detail_content {
  width: 100%;
  height: 100%;
  background-color: #0c0401;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  padding: 50px 30px 0;
}
.peposito_de_title {
  width: 820px;
  height: 70px;
  background: url("/images/main/detail_t.png") no-repeat;
  background-size: contain;
  margin: 0 auto;
  overflow: hidden;
  text-indent: -9999px;
}

.recharge_input {
  width: 861px;
  height: 111px;
  box-sizing: border-box;
  border: 3px solid #b9851f;
  margin: 60px auto 0;
  line-height: 111px;
  border-radius: 20px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.order-status-section {
  width: 861px;
  margin: 20px auto 0;
  padding: 20px;
  border: 2px solid #b9851f;
  border-radius: 15px;
  background: rgba(185, 133, 31, 0.1);
}

.dot_icon {
  width: 33px;
  height: 33px;
  display: inline-block;
  background: url("/images/main/do.png") no-repeat;
  background-size: contain;
  background-position: center;
}

.detait_re_txt {
  word-break: break-all;
}

.detai_re_cancel {
  width: 403px;
  height: 103px;
  background: url("/images/main/cancel.png") no-repeat;
  background-size: contain;
  line-height: 103px;
  text-align: center;
  color: #0c0900;
}

.detai_re_submit {
  width: 375px;
  height: 103px;
  background: url("/images/main/ok.png") no-repeat;
  background-size: contain;
  line-height: 103px;
  text-align: center;
  color: #f2d659;
}
</style>
