<template>
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
                    ${{ amount ? (Number(amount)).toFixed(2) : "0.00" }}
                </div>
            </div>

            <div class="text-[40px] detait_handling_input flex justify-between">
                <div>Impuestos a pagardiv </div>
                <div class="text-[#fe0000]">
                    ${{ amount ? (Number(amount) * 0.1).toFixed(2) : "0.00" }}
                </div>
            </div>
        </div>
    </CommonPop>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

// import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    pop6Submit: () => void
    tax: number
    retairPop07Ref: any
    amount: number
    onSuccess: () => void
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
    props.retairPop07Ref.open()
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
