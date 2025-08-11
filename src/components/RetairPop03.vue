<template>
    <CommonPop
        v-model="showCenter"
        :title="t('components.details')"
        :is-single-btn="true"
        :cancel-text="t('components.cancel')"
        :confirm-text="t('components.payWithdrawalFee')"
        @cancel="handleCancel"
        @confirm="handleSubmit"
    >
        <!-- 尊敬的用户：我们致力于为用户提供更优质的提现体验。
若通过VIP支付渠道一次性提现的金额超过3,000.00美元，VIP支付渠道将收取提现金额的5%作为管理费。
这种取款手续费是用于维护支付系统的。 -->

        <div class="recharge_detail_content">
            <div class="text-[50px] detait_re_txt word-break-all pt-[40px]">
                {{ t("components.vipFeeDescription") }}
            </div>

            <div class="text-[50px] pt-[30px] detait_handling_input flex justify-between items-center">
                <span>{{ t("components.withdrawalAmount") }} </span>
                <span class="text-[#fe0000]">${{ activeVal ? activeVal.toFixed(2) : "0.00" }}</span>
            </div>

            <div class="text-[50px] pt-[30px] detait_handling_input flex justify-between items-center">
                <span>{{ t("components.withdrawalFee") }} </span>
                <span class="text-[#fe0000]">${{ coastNum ? coastNum.toFixed(2) : "0.00" }}</span>
            </div>
        </div>
    </CommonPop>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'
import { retairRate } from '@/config/retarirRate'
import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    activeVal: number
    onSuccess: () => void
    rechargeRef: any
    submitInfo: (info: { total: number, coast: number }) => void
    retairPop04Ref: any
    pop3Submit: () => void
}>()
const showCenter = ref(false)
const { i18n } = useGlobal()
const { t } = i18n
const userStore = useUserStore()
const userInfo = computed(() => {
    return userStore.userInfo
})

const isFirstWithdraw = computed(() => {
    return Number(userInfo.value?.wallet?.total_withdraw) === 0
})

function handleCancel() {
    hide()
}

const coastNum = computed(() => {
    // const totalWithdraw = Number(userInfo.value?.wallet?.total_withdraw)
    const cur = Number(props.activeVal)
    // const total = Number(userInfo.value?.wallet?.total_withdraw) + Number(props.activeVal)

    // if (totalWithdraw > 3000) {
    //     return cur * retairRate
    // }
    // if (total > 3000) {
    //     return (total - 3000) * retairRate
    // }
    if (!isFirstWithdraw.value) {
        return cur * retairRate
    }
    return 0
})

function handleSubmit() {
    if (coastNum.value > 0) {
        props.submitInfo({
            total: props.activeVal,
            coast: coastNum.value,
        })
        props.retairPop04Ref.open()
    }
    else {
        props.pop3Submit()
        // props.retairPop04Ref.open()
    }
    hide()

    // console.log("handleSubmit");
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
.recharge_detail_popup {
  width: 1000px;
  padding-bottom: 50px;
  border-radius: 20px;
  background-color: #0c0401;
  border: 3px solid #b9851f;
  line-height: 1.4;
}
.recharge_detail_content {
  width: 100%;
  height: 100%;
}
.peposito_de_title {
  width: 820px;
  height: 70px;
  margin: 0 auto;
  overflow: hidden;
}
.detait_handling_input {
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
</style>
