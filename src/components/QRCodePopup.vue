<template>
    <van-popup :show="show" round class="qrcode_popup" @update:show="handleShowChange">
        <div class="qrcode_content text-[45px]">
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
                <div class="qrcode_close" @click="handleClose">
                    {{ t("components.close") }}
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import { useGlobal } from '@/composables'
import { formatNumber } from '@/utils/tools'

defineOptions({
    name: 'QRCodePopup',
})

const props = withDefaults(defineProps<Props>(), {
    payUrl: '',
})

const emit = defineEmits<Emits>()

interface Props {
    show: boolean
    amount: string | number
    orderNo: string
    qrCodeDataUrl: string
    payUrl?: string
}

interface Emits {
    (e: 'update:show', value: boolean): void
    (e: 'close'): void
}

const { i18n } = useGlobal()
const { t } = i18n

// 格式化金额
function formatVal(val: string | number): string {
    return formatNumber(Number(val))
}

// 复制支付链接
async function copyPayUrl() {
    if (!props.payUrl) {
        showFailToast('支付链接不可用')
        return
    }

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(props.payUrl)
            showSuccessToast('链接已复制')
        }
        else {
            // 降级方案
            const textArea = document.createElement('textarea')
            textArea.value = props.payUrl
            textArea.style.position = 'fixed'
            textArea.style.left = '-999999px'
            textArea.style.top = '-999999px'
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()

            try {
                document.execCommand('copy')
                showSuccessToast('链接已复制')
            }
            catch (err) {
                console.error('复制失败:', err)
                showFailToast('复制失败')
            }
            finally {
                document.body.removeChild(textArea)
            }
        }
    }
    catch (err) {
        console.error('复制失败:', err)
        showFailToast('复制失败')
    }
}

// 处理显示状态变化
function handleShowChange(value: boolean) {
    emit('update:show', value)
}

// 关闭弹窗
function handleClose() {
    emit('update:show', false)
    emit('close')
}
</script>

<style lang="scss" scoped>
.qrcode_popup {
  width: 850px !important;
  background: #1b0a00;
  border: 3px solid #351b00;
  border-radius: 20px;
}

.qrcode_content {
  padding: 60px 40px;
  text-align: center;
  color: #f3d558;
}

.qrcode_val {
  font-size: 50px;
  font-weight: bold;
  color: #f3d558;
}

.qrcode_order {
  font-size: 40px;
  color: #f3d558;
}

.qrcode_container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  margin: 20px 0;
}

.qrcode_image {
  max-width: 250px;
  max-height: 250px;
  border-radius: 10px;
}

.qrcode_loading {
  color: #f3d558;
  font-size: 40px;
}

.qrcode_tips {
  color: #f3d558;
  line-height: 1.4;
}

.qrcode_actions {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
}

.qrcode_copy,
.qrcode_close {
  flex: 1;
  height: 80px;
  line-height: 80px;
  border-radius: 15px;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.qrcode_copy {
  background: linear-gradient(135deg, #f3d558, #e6c200);
  color: #1b0a00;
}

.qrcode_copy:hover {
  background: linear-gradient(135deg, #e6c200, #d4b000);
  transform: translateY(-2px);
}

.qrcode_close {
  background: linear-gradient(135deg, #8c5400, #693b00);
  color: #f3d558;
  border: 2px solid #f3d558;
}

.qrcode_close:hover {
  background: linear-gradient(135deg, #693b00, #5a3200);
  transform: translateY(-2px);
}
</style>
