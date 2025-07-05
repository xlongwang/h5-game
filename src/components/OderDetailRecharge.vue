<template>
    <van-popup v-model:show="showCenter" round class="recharge_detail_popup">
        <div class="recharge_detail_content">
            <div
                class="peposito_de_title font_cinze text-center text-[70px] font-bold mx-auto mt-[50px]"
            >
                {{ t("components.details") }}
            </div>
            <div class="recharge_detail_content_item">
                <div class="recharge_detail_content_item_title">
                    {{ t("components.details") }}
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
}>()

const { i18n } = useGlobal()
const { t } = i18n

const userStore = useUserStore()

const userInfo = computed(() => {
    return userStore.userInfo
})

const amount = computed(() => {
    return Number(userInfo.value?.wallet.balance) + Number(userInfo.value?.wallet.bonus)
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
const orderStatus = ref<OrderStatus | ''>('')
const pollingTimer = ref<NodeJS.Timeout | null>(null)
const pollingInterval = 3000 // 3秒轮询一次
const maxPollingTime = 5 * 60 * 1000 // 最大轮询5分钟
const startPollingTime = ref<number>(0)

const showQRCode = ref(false)
const qrCodeDataUrl = ref<string>('')
const payUrl = ref<string>('')

function open() {
    showCenter.value = true
    orderNo.value = ''
    orderStatus.value = ''
}

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
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
