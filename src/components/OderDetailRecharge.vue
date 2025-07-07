<template>
    <CommonPop
        v-model="showCenter"
        :title="t('components.orderDetails')"
        :is-single-btn="false"
        :cancel-text="t('components.cancel')"
        :confirm-text="isSubmitting ? t('components.creatingOrder') : t('components.goToPay')"
        :loading="isSubmitting"
        @cancel="handleCancel"
        @confirm="handleSubmit"
    >
        <div class="recharge_detail_content">
            <div class="recharge_input text-[45px]">
                <!-- <div>Tarifa de manejo</div>
                <div class="text-[#f00]">${{ formatVal(activeVal) }}</div> -->
                <div class="whitespace-nowrap">{{ t("components.deposit") }} ${{ formatVal(activeVal) }}</div>
                <div class="whitespace-nowrap">{{ t("components.receive") }} ${{ formatVal(receiveVal) }}</div>
            </div>
            <div
                class="text-[37px] word-break-all text-[#f3d559] px-[12px] line-height-[50px] pt-[37px] detait_re_txt"
            >
                <span class="dot_icon"></span>
                {{ t("components.payAccordingToOrder") }}
            </div>
        </div>
    </CommonPop>

    <!-- 二维码弹窗 -->
    <van-popup v-model:show="showQRCode" round class="qrcode_popup">
        <div class="qrcode_content text-[45px]">
            <!-- <div class="qrcode_title">{{ t("components.scanToPay") }}</div> -->
            <div class="qrcode_val pb-[20px]">
                {{ t("components.qrCodeVal") }} ${{ formatVal(amount) }}
            </div>
            <div class="qrcode_order pb-[30px]">
                {{ t("components.qrOrderNum") }}: {{ orderNo }}
            </div>
            <div class="qrcode_container">
                <img
                    v-if="qrCodeDataUrl"
                    :src="qrCodeDataUrl"
                    alt="支付二维码"
                    class="qrcode_image"
                >
                <div v-else class="qrcode_loading">{{ t("components.generatingQRCode") }}</div>
            </div>
            <div class="qrcode_tips pt-[30px] text-[45px]">{{ t("components.scanQRCodeToPay") }}</div>
            <div class="qrcode_actions">
                <div class="qrcode_copy" @click="copyPayUrl">
                    {{ t("components.copyLink") }}
                </div>
                <div class="qrcode_close" @click="closeQRCode">
                    {{ t("components.close") }}
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import type { OrderStatus } from '@/types'
import QRCode from 'qrcode'
import { showSuccessToast } from 'vant'
import { onUnmounted, ref } from 'vue'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    activeVal: number
    onSuccess: () => void
    extra: number
}>()

const { i18n } = useGlobal()
const { t } = i18n

const userStore = useUserStore()

const userInfo = computed(() => {
    return userStore.userInfo
})

const receiveVal = computed(() => {
    return Number(props.activeVal) + Number(props.extra ? props.extra : 0)
})

function formatVal(val: number) {
    if (!val)
        return '0.00'
    if (val > 20) {
        return val
    }
    return val.toFixed(2)
}

const showCenter = ref(false)
const orderNo = ref<string>('')
const amount = ref<number>(0)
const orderStatus = ref<OrderStatus | ''>('')
const pollingTimer = ref<NodeJS.Timeout | null>(null)
const pollingInterval = 3000 // 3秒轮询一次
const maxPollingTime = 5 * 60 * 1000 // 最大轮询5分钟
const startPollingTime = ref<number>(0)

const showQRCode = ref(false)
const qrCodeDataUrl = ref<string>('')
const payUrl = ref<string>('')
const isSubmitting = ref(false)
const submitTimer = ref<NodeJS.Timeout | null>(null)

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
            const result = await userApi.queryOrder({ order_no: orderNumber.toString() })
            console.log('轮询订单状态结果:', result)

            if (result.code === 200 && result.data) {
                const status = result.data.status
                orderStatus.value = status as OrderStatus

                // 如果订单成功，停止轮询并关闭弹窗
                if (status === 'SUCCESS') {
                    stopPolling()
                    showSuccessToast(t('components.success'))

                    setTimeout(() => {
                        showQRCode.value = false
                        showCenter.value = false
                        props.onSuccess()
                    }, 1000) // 2秒后关闭弹窗
                    return
                }

                // 如果订单失败或退回，停止轮询
                if (status === 'FAIL' || status === 'RETURN') {
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

// 生成二维码
async function generateQRCode(url: string) {
    try {
        const dataUrl = await QRCode.toDataURL(url, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF',
            },
        })
        qrCodeDataUrl.value = dataUrl
    }
    catch (error) {
        console.error('生成二维码失败:', error)
    }
}

// 复制支付链接
async function copyPayUrl() {
    try {
        await navigator.clipboard.writeText(payUrl.value)
        showSuccessToast(t('components.copySuccess'))
        // closeQRCode()
        // 这里可以添加复制成功的提示
        console.log('支付链接已复制到剪贴板')
    }
    catch (error) {
        console.error('复制失败:', error)
    }
}

// 关闭二维码弹窗
function closeQRCode() {
    showQRCode.value = false
    qrCodeDataUrl.value = ''
    payUrl.value = ''
}

// 防抖函数
function debounce(func: (...args: any[]) => any, delay: number) {
    return function (this: any, ...args: any[]) {
        if (submitTimer.value) {
            clearTimeout(submitTimer.value)
        }
        submitTimer.value = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

// 实际的提交逻辑
async function submitOrder() {
    if (isSubmitting.value)
        return

    isSubmitting.value = true

    try {
        const result = await userApi.createPayin({
            amount: props.activeVal.toString(),
            player_id: userInfo.value?.id?.toString() || '',
        })
        const payInfo = result.data?.pay_info
        const order_no = result.data?.order_no
        if (result.code === 200 && order_no && payInfo) {
            // 保存支付URL
            payUrl.value = payInfo
            orderNo.value = order_no
            amount.value = result.data?.amount

            // 生成二维码
            await generateQRCode(payInfo)

            // 显示二维码弹窗
            showQRCode.value = true

            // 开始轮询订单状态
            startPollingOrderStatus(order_no)
        }
        else {
            console.error('创建订单失败:', result)
            // 创建订单失败时关闭弹窗
            showCenter.value = false
        }
    }
    catch (error) {
        console.error('提交订单失败:', error)
        // 提交失败时关闭弹窗
        showCenter.value = false
    }
    finally {
        isSubmitting.value = false
    }
}

// 防抖处理的提交函数
const handleSubmit = debounce(submitOrder, 500)

function handleCancel() {
    stopPolling()
    showCenter.value = false
    closeQRCode()
    orderNo.value = ''
    orderStatus.value = ''
}

function open() {
    showCenter.value = true
    orderNo.value = ''
    orderStatus.value = ''
}

// 组件卸载时清理定时器
onUnmounted(() => {
    stopPolling()
    closeQRCode()
    if (submitTimer.value) {
        clearTimeout(submitTimer.value)
    }
})

defineExpose({
    open,
})
</script>

<style lang="scss" scoped>
.recharge_detail_content {

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

.dot_icon {
  width: 33px;
  height: 33px;
  display: inline-block;
  background: url("/images/main/do.png") no-repeat;
  background-size: contain;
  background-position: center;
}

// 二维码弹窗样式
.qrcode_popup {
  width: 1000px;
  height: 1000px;
  box-sizing: border-box;
  border-radius: 20px;
  border-radius: 32px;
  background-color: #0c0401;
  background-size: contain;
  border: 3px solid #b9851f;
  font-size: 50px;
  box-sizing: border-box;
  padding-top: 50px;
  // &::after {
  //   width: 800px;
  //   height: 600px;
  //   background: url("/images/main/border.png") no-repeat;
  //   background-size: contain;
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: 2;
  //   pointer-events: none;
  // }
}

.qrcode_content {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  padding: 30px 20px;
  text-align: center;
}

.qrcode_title {
  font-size: 48px;
  color: #f3d559;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
}

.qrcode_container {
  width: 350px;
  height: 350px;
  background: #fff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto;
}

.qrcode_image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.qrcode_loading {
  font-size: 32px;
  color: #666;
  text-align: center;
}

.qrcode_tips {
  font-size: 50px;
  color: #f3d559;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.4;
}

.qrcode_actions {
  display: flex;
  gap: 30px;
  width: 100%;
  justify-content: center;
}

.qrcode_copy {
  width: 375px;
  height: 103px;
  background: url("/images/main/ok.png") no-repeat;
  background-size: cover;
  line-height: 103px;
  text-align: center;
  color: #f2d659;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}

.qrcode_close {
  width: 404px;
  height: 103px;
  background: url("/images/main/cancel.png") no-repeat;
  background-size: cover;
  line-height: 103px;
  text-align: center;
  color: #0c0900;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}
</style>
