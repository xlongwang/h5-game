<template>
    <Teleport to="body">
        <van-popup v-model:show="showBottom" position="bottom" class="recharge_popup">
            <div class="relative">
                <div class="pop_close" @click="handleClose"></div>
                <div class="re_pop_content w-[656px] p-[29px]">
                    <div class="peposito_title mx-auto mt-[50px]">peposito</div>
                    <div class="text-center text-[30px] pt-[35px]">
                        {{ t('components.selectDepositAmount') }}
                    </div>
                    <div class="re_list">
                        <div
                            v-for="item in reItem"
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
                        <div class="re_inner_ext text-[20px]">{{ t('components.extra') }}+0.00</div>
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
            :active-val="activeVal"
            :on-success="handleSuccess"
        />
    </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGlobal } from '@/composables'
import '@/assets/scss/rechargePop.scss'

const { i18n } = useGlobal()
const { t } = i18n

const showBottom = ref(false)
const activeVal = ref(100)
const OderDetailRecargelRef = ref()
const reItem = [
    {
        id: 1,
        val: 100,
    },
    {
        id: 2,
        val: 200,
    },
    {
        id: 3,
        val: 250,
    },
    {
        id: 4,
        val: 1,
    },
    {
        id: 5,
        val: 2,
    },
    {
        id: 6,
        val: 5,
    },
    {
        id: 7,
        val: 10,
    },
    {
        id: 8,
        val: 20,
    },
]

watch(showBottom, (newVal) => {
    if (newVal) {
        activeVal.value = 100
    }
})

function handleRe(item: any) {
    activeVal.value = item.val
}

function handleClose() {
    showBottom.value = false
}

function handleSuccess() {
    showBottom.value = false
}

function handleSubmit() {
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
