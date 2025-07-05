<template>
    <van-popup v-model:show="showCenter" round class="recharge_detail_popup">
        <div class="recharge_detail_content">
            <div
                class="peposito_de_title font_cinze text-center text-[70px] font-bold mx-auto mt-[50px]"
            >
                {{ t("components.details") }}
            </div>
            <!-- <div class="text-[50px] detait_re_txt pt-[80px] text-center">
        Tarifa de manejo
        <span class="text-[#f3d559]">${{ confirmInfo.coast.toFixed(2) }}</span>
      </div> -->
            <div class="text-[40px] detait_re_txt pt-[80px]">{{ t("components.personalTaxDescription") }}</div>
            <div class="text-[50px] detait_re_txt pt-[40px] flex justify-between">
                <div>{{ t("components.withdrawalAmount") }}</div>

                <div>${{ amount ? Number(amount).toFixed(2) : "0.00" }}</div>
            </div>
            <div class="text-[50px] detait_re_txt pt-[40px] flex justify-between">
                <div>{{ t("components.personalIncomeTax") }}</div>

                <div>${{ coastNum }}</div>
            </div>
            <div
                class="detai_re_btns px-[35px] pt-[40px] justify-between flex text-[40px] font-bold"
            >
                <div class="retirar-btn text-[50px] font-bold" @click="handleSubmit">
                    {{ t("components.payPersonalTax") }}
                </div>
            </div>
        </div>
    </van-popup>
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

const userInfo = computed(() => {
    return userStore.userInfo
})

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

  position: relative;
  z-index: 1;
  box-sizing: border-box;
  padding: 40px 30px 0;
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
