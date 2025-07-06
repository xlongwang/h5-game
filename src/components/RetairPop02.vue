<template>
   <CommonPop
        v-model="showCenter"
        :title="t('components.details')"
        :is-single-btn="true"
        :cancel-text="t('components.cancel')"
        :confirm-text="t('components.depositButton')"
        :tips="t('components.tipsBottom')"
        @cancel="handleCancel"
        @confirm="handleSubmit"
    >
        <div class="recharge_detail_content">
            <div class="text-[50px] detait_re_txt">
                {{ t("components.vipChannelDescription") }}
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
    rechargeRef: any
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
    const isEnough = Number(userInfo.value?.wallet?.total_charge) >= 200

    if (isEnough) {
        console.log('handleSubmit')
    }
    else {
        console.log('not enough')
        props.rechargeRef.open()
    }
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
