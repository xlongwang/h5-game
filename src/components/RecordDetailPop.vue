<template>
    <van-popup v-model:show="showCenter" round class="recharge_detail_popup">
        <div class="recharge_detail_content">
            <div
                class="peposito_de_title font_cinze text-center text-[70px] font-bold mx-auto mt-[50px]"
            >
                {{ t("components.details") }}
            </div>

            <div class="text-[40px] gap-[15px] px-[30px] flex flex-col pt-[60px] text-left">
                <div class="record__pop_item">
                    Amount: {{ currentRecord?.amount.toFixed(2) }}
                </div>
                <div class="record__pop_item">Time: {{ currentRecord?.updated_at }}</div>
                <div class="record__pop_item">status: {{ currentRecord?.status }}</div>
                <div class="record__pop_item">pix_type: {{ currentRecord?.pix_type }}</div>
                <div class="record__pop_item">plantform_no: {{ currentRecord?.plantform_no }}</div>
            </div>

            <div
                class="detai_re_btns px-[35px] pt-[20px] justify-between flex text-[40px] font-bold"
            >
                <div class="retirar-btn text-[50px] font-bold" @click="handleSubmit">
                    {{ t("components.confirm") }}
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import type { OrderItem } from '~/types'

// import { userApi } from "@/api/user-api";
import { useGlobal } from '@/composables'
import useUserStore from '@/stores/use-user-store'

const props = defineProps<{
    currentRecord: OrderItem
}>()
const userStore = useUserStore()
const showCenter = ref(false)
const { i18n } = useGlobal()
const { t } = i18n

const userInfo = computed(() => {
    return userStore.userInfo
})

function handleSubmit() {
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

onMounted(() => {
    console.log('currentRecord', props.currentRecord)
})
</script>

<style lang="scss" scoped>
.recharge_detail_popup {
  width: 1000px;
  padding-bottom: 70px;
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
  ground-position: center;
}

.record__pop_item{
  padding-bottom: 14px;
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
