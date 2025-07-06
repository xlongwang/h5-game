<template>
    <CommonPop
        v-model="showCenter"
        :title="t('components.details')"
        :is-single-btn="true"
        :cancel-text="t('components.cancel')"
        :confirm-text="t('components.useVIPWithdrawalChannel')"
        :tips="t('components.tipsBottom')"
        @cancel="handleCancel"
        @confirm="submit"
    >
        <div class="recharge_detail_content pt-[10px]">
            <div class="text-[50px] flex justify-between items-center">
                <span class="pr-[10px]">{{ t("components.peopleInLine") }}: </span>
                <span class="text-[#f3d559] whitespace-nowrap">{{ 10000 + Math.ceil(Math.random() * 10000) }}</span>
            </div>

            <div class="text-[50px] pt-[30px] flex justify-between items-center">
                <span class="pr-[10px]">{{ t("components.expectedTime") }}: </span>
                <span class="text-[#f3d559] whitespace-nowrap">{{ 2000 + Math.ceil(Math.random() * 2000) }}</span>
            </div>
        </div>
    </CommonPop>
</template>

<script setup lang="ts">
// import { userApi } from "@/api/user-api";
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    activeVal: number
    onSuccess: () => void
    retairPop02Ref: any
}>()

const showCenter = ref(false)

const { i18n } = useGlobal()
const { t } = i18n
const userStore = useUserStore()

const userInfo = computed(() => {
    return userStore.userInfo
})

function handleCancel() {
    showCenter.value = false
}

function submit() {
    console.log('submit')
    props.retairPop02Ref.open()
    showCenter.value = false
}

function open() {
    showCenter.value = true
}

defineExpose({
    open,
})
</script>

<style lang="scss" scoped>
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
  width: 375px;
  height: 103px;
  background: url("/images/main/ok.png") no-repeat;
  background-size: contain;
  line-height: 103px;
  text-align: center;
  color: #0c0900;
}

.detai_re_submit {
  width: 403px;
  height: 103px;
  background: url("/images/main/cancel.png") no-repeat;
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
