<template>
    <!-- 个人所得税支付确认 弹窗 -->
    <!--
    尊敬的用户：此次取款属于您的个人额外收入。根据联邦法规，银行需代扣10%的个人所得税。
您当前提款申请的进度已达 99.9%，距离提款成功仅剩最后一步了。
纳税后，银行会立即处理转账事宜。 -->

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
            <div class="text-[40px] detait_re_txt pt-[40px]">
                <div>{{ t("components.retairPop06Title") }}</div>
                <div>
                    {{ t("components.retairPop06Desc") }}
                </div>
            </div>

            <div class="text-[40px] detait_handling_input flex justify-between">
                <div>{{ t("components.withdrawalAmount") }}</div>
                <div class="text-[#fe0000]">
                    ${{ amount ? Number(amount).toFixed(2) : "0.00" }}
                </div>
            </div>

            <div class="text-[40px] detait_handling_input flex justify-between">
                <div>{{ t("components.taxesToPay") }}</div>
                <!-- 需缴纳的税款 -->
                <div class="text-[#fe0000]">
                    ${{ amount ? (Number(amount) * 0.1).toFixed(2) : "0.00" }}
                </div>
            </div>
        </div>
    </CommonPop>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

const props = defineProps<{
    pop6Submit: (...args: any) => void
    tax: number
    retairPop07Ref: any
    amount: number
}>()

// const userStore = useUserStore()

const showCenter = ref(false)
const { i18n } = useGlobal()
const { t } = i18n

function handleCancel() {
    console.log('handleCancel')
    hide()
}

async function handleSubmit() {
    props.pop6Submit(Number(props.amount) * 0.1)
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
