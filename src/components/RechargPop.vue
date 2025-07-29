<template>
    <Teleport to="body">
        <van-popup v-model:show="showBottom" position="bottom" class="recharge_popup" :style="popupStyle">
            <div class="relative">
                <div class="pop_close" @click="handleClose"></div>
                <div class="re_pop_content w-[656px] p-[29px]">
                    <div class="peposito_title mx-auto mt-[50px]">peposito</div>
                    <div class="text-center text-[30px] pt-[35px]">
                        {{ t('components.selectDepositAmount') }}
                    </div>
                    <div class="re_list">
                        <div
                            v-for="item in reItems"
                            :key="item.id"
                            class="re_btn"
                            :class="{ active: activeVal === item.val }"
                            @click="handleRe(item)"
                        >
                            ${{ formatVal(item.val) }}
                        </div>
                    </div>

                    <div class="re_btn_box flex items-center text-[40px]">
                        <div class="re_doller">$</div>
                        <div class="re_inner_cur">{{ formatVal(activeVal) }}</div>
                        <div class="re_inner_ext text-[20px]">{{ t('components.extra') }}+{{ formatVal(extraVal) }}</div>
                    </div>

                    <div class="re_submit_btn" @click="handleSubmit"></div>
                </div>
                <p class="text-center re_text text-[28px] text-[#b17924] pt-[20px]">
                    {{ t('components.afterSuccessfulPayment') }}
                </p>

                <div class="re_pop_bg01"></div>
                <div class="re_pop_bg02"></div>
            </div>
        </van-popup>

        <OderDetailRecharge
            ref="OderDetailRecargelRef"
            :on-success="handleSuccess"
        />
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGlobal } from '@/composables'
import { rechargAmountList } from '@/config/RechargeConfig'
import '@/assets/scss/rechargePop.scss'

const props = defineProps<{
    onSuccess: () => void
}>()

const { i18n } = useGlobal()
const { t } = i18n

const showBottom = ref(false)

// 动态设置CSS变量用于多语言图片
const popupStyle = computed(() => ({
    '--re-submit-bg': `url('${t('components.images.reSubmit')}')`,
}))
const activeVal = ref(100)
const OderDetailRecargelRef = ref()
const reItems = ref(rechargAmountList)
const extraVal = ref(0)

watch(showBottom, (newVal) => {
    if (newVal) {
        activeVal.value = 100
    }
})

function handleRe(item: any) {
    activeVal.value = item.val
    extraVal.value = item.extra
}

function handleClose() {
    showBottom.value = false
}

function handleSuccess() {
    showBottom.value = false
    props.onSuccess()
}

function handleSubmit() {
    OderDetailRecargelRef.value.setActiveVal(activeVal.value)
    OderDetailRecargelRef.value.open()
}

function formatVal(val: number) {
    if (val > 20) {
        return val
    }
    return val.toFixed(2)
}

function open() {
    showBottom.value = true
}

defineExpose({
    open,
})
</script>

<style scoped>
.re_btn {
  font-size: 35px;
}
</style>
