<template>
    <CommonPop
        v-model="showCenter"
        :title="t('components.orderDetails')"
        :is-single-btn="false"
        :cancel-text="t('components.cancel')"
        :confirm-text="t('components.goToPay')"
        @cancel="handleCancel"
        @confirm="handleSubmit"
    >
        <div class="recharge_detail_content">
            <div class="text-[50px] detait_handling_input detait_re_txt flex justify-between text-center">
                <div>{{ t("components.handlingFeeText") }}</div>
                <!-- 管理费 -->
                <div class="text-[#fe0000]">${{ confirmInfo.coast.toFixed(2) }}</div>
            </div>

            <!-- 请根据订单金额进行支付。若订单金额与实际支付金额不符，押金将不予退还！ -->

            <div class="text-[40px] detait_re_txt pt-[80px]">
                <span class="dot_icon mr-[10px]"></span>{{ t("components.payAccordingToOrder") }}
            </div>
        </div>
    </CommonPop>
</template>

<script setup lang="ts">
// import { userApi } from "@/api/user-api";
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    pop4Submit: (coast: number) => void
    confirmInfo: { total: number, coast: number }
}>()
const showCenter = ref(false)
const { i18n } = useGlobal()
const { t } = i18n
const userStore = useUserStore()
const userInfo = computed(() => {
    return userStore.userInfo
})

function handleCancel() {
    console.log('handleCancel')
    hide()
}

function handleSubmit() {
    // console.log("handleSubmit");
    props.pop4Submit(props.confirmInfo.coast)
    hide()
}

function formatVal(val: number) {
    if (!val)
        return '0.00'
    if (val > 20) {
        return val
    }
    return val.toFixed(2)
}

function open() {
    showCenter.value = true
}

function hide() {
    showCenter.value = false
}

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
  box-sizing: border-box;
}
.peposito_de_title {
  width: 820px;
  height: 70px;
  margin: 0 auto;
  overflow: hidden;
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
</style>
