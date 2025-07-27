<template>
    <!-- 请根据订单金额进行支付。若订单金额与实际支付金额不符，押金将不予退还！ -->\
    <CommonPop
        v-model="showCenter"
        :title="t('components.details')"
        :is-single-btn="false"
        :cancel-text="t('components.cancel')"
        :confirm-text="isSubmitting ? t('components.creatingOrder') : t('components.goToPay')"
        :loading="isSubmitting"
        @cancel="handleCancel"
        @confirm="handleSubmit"
    >
        <div class="recharge_detail_content">
            <div class="text-[50px] detait_handling_input flex justify-between">
                <!-- 管理费 -->
                <div>{{ t("components.handlingFeeText") }}</div>

                <div class="text-[#fe0000]">
                    ${{ amount ? (Number(amount)).toFixed(2) : "0.00" }}
                </div>
            </div>

            <div class="text-[40px] detait_re_txt pt-[50px]">
                <span class="dot_icon mr-[10px]"></span>{{ t("components.payAccordingToOrder") }}
            </div>
        </div>
    </CommonPop>
</template>

<script setup lang="ts">
// import { userApi } from "@/api/user-api";
// import { showSuccessToast } from 'vant'
// import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    pop9Submit: () => void
    amount?: number
    onSuccess?: () => void
}>()

const userStore = useUserStore()

const showCenter = ref(false)
const isSubmitting = ref(false)
const submitTimer = ref<NodeJS.Timeout | null>(null)
const { i18n } = useGlobal()
const { t } = i18n

const userInfo = computed(() => {
    return userStore.userInfo
})

// // 防抖函数
// function debounce(func: (...args: any[]) => any, delay: number) {
//     return function (this: any, ...args: any[]) {
//         if (submitTimer.value) {
//             clearTimeout(submitTimer.value)
//         }
//         submitTimer.value = setTimeout(() => {
//             func.apply(this, args)
//         }, delay)
//     }
// }

function handleCancel() {
    console.log('handleCancel')
    hide()
}

// // 实际的提交逻辑
// async function submitOrder() {
    
// }

// 防抖处理的提交函数
const handleSubmit =() => {
    props.pop9Submit()
}

function open() {
    showCenter.value = true
}

function hide() {
    showCenter.value = false
}

// 组件卸载时清理定时器
onUnmounted(() => {
    if (submitTimer.value) {
        clearTimeout(submitTimer.value)
    }
})

defineExpose({
    open,
    hide,
})
</script>

<style lang="scss" scoped>
.recharge_detail_content {
  width: 100%;
  height: 100%;

  position: relative;
  z-index: 1;
}
.peposito_de_title {
  width: 820px;
  height: 70px;
  margin: 0 auto;
  overflow: hidden;
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

.detait_handling_input{
  height: 93px;
  border-radius: 15px;
  border: 3px solid #b9851f;
  background-color: #190b00;
  padding: 0 40px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
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
</style>
