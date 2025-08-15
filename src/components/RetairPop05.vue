<template>
    <!-- 缴纳个人所得税 -->
    <CommonPop
        v-model="showCenter"
        :title="t('components.details')"
        :is-single-btn="true"
        :cancel-text="t('components.cancel')"
        :confirm-text="t('components.payPersonalTax')"
        @cancel="handleCancel"
        @confirm="handleSubmit"
    >
        <div class="recharge_detail_content">
            <!-- <div class="text-[50px] detait_re_txt pt-[80px] text-center">
        Tarifa de manejo
        <span class="text-[#f3d559]">${{ confirmInfo.coast.toFixed(2) }}</span>
      </div> -->
            <div class="text-[40px] detait_re_txt pt-[40px]">{{ t("components.personalTaxDescription") }}</div>
            <div class="text-[35px] detait_re_txt detait_handling_input pt-[40px] flex justify-between">
                <div>{{ t("components.withdrawalAmount") }}</div>

                <div class="text-[#fe0000]">${{ amount ? Number(amount).toFixed(2) : "0.00" }}</div>
            </div>
            <div class="text-[35px] detait_re_txt detait_handling_input pt-[40px] flex justify-between">
                <div>{{ t("components.personalIncomeTax") }}</div>

                <div class="text-[#fe0000]">${{ coastNum }}</div>
            </div>
        </div>
    </CommonPop>
</template>

<script setup lang="ts">
// import { userApi } from "@/api/user-api";
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    pop4Submit: () => void
    amount: number
    setPrsonalTax: (tax: number) => void
}>()
const userStore = useUserStore()
const showCenter = ref(false)
const { i18n } = useGlobal()
const { t } = i18n

// const userInfo = computed(() => {
//     return userStore.userInfo
// })

const coastNum = computed(() => {
    if (!props.amount)
        return 0
    const num = Number(props.amount)
    return (num * 0.1).toFixed(2)
})

function handleCancel() {
    console.log('handleCancel')
    hide()
}

function handleSubmit() {
    // console.log("handleSubmit");
    props.pop4Submit()
    props.setPrsonalTax(Number(coastNum.value))
    hide()
}

// function formatVal(val: number) {
//     if (!val)
//         return '0.00'
//     if (val > 20) {
//         return val
//     }
//     return val.toFixed(2)
// }

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
