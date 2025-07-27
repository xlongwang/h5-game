<template>
    <!-- 财务费用 -->

    <!-- 您的个人所得税申请已提交。我们将安排财务部门前往银行为您缴纳个人所得税（由于当前订单处理量较大，财务部门需统一提交申请，预计需7个工作日完成。）若您需委托专属财务团队处理订单，需支付1000元会计服务费，专属财务团队将立即为您处理订单。 -->
    <CommonPop
        v-model="showCenter"
        :title="t('components.details')"
        :is-single-btn="true"
        :confirm-text="t('components.confirm')"
        @confirm="handleSubmit"
    >
        <div class="recharge_detail_content">
            <div class="text-[40px] detait_re_txt pt-[40px]">
                Las finanzas han enviado tu dinero al banco, pero debido a problemas personales con tu banco, se activó el control de riesgos del banco y el pago ha fallado. Ahora hemos devuelto todo el monto recargado a tu cuenta. Por favor, revisa dentro del juego. Si necesitas retirar dinero, cambia de cuenta y vuelve a enviar la solicitud.
            </div>
        </div>
    </CommonPop>
</template>

<script setup lang="ts">
// import { userApi } from "@/api/user-api";
import { useGlobal } from '@/composables'
// import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    pop10Submit: () => void
}>()
// const userStore = useUserStore()
const showCenter = ref(false)
const { i18n } = useGlobal()
const { t } = i18n

// const userInfo = computed(() => {
//     return userStore.userInfo
// })

function handleCancel() {
    console.log('handleCancel')
    hide()
}

function handleSubmit() {
    // console.log("handleSubmit");
    props.pop10Submit()
    hide()
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
