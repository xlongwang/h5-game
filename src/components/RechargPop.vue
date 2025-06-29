<template>
    <div>
        <van-popup v-model:show="showBottom" position="bottom" class="recharge_popup">
            <div class="relative">
                <div class="pop_close" @click="handleClose"></div>
                <div class="re_pop_content w-[656px] p-[29px]">
                    <div class="peposito_title mx-auto mt-[50px]">peposito</div>
                    <div class="text-center text-[30px] pt-[35px]">
                        Seleccionar monto del depósito
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

                    <div class="re_btn_box flex items-center">
                        <div class="re_doller">$</div>
                        <div class="re_inner_cur">{{ formatVal(activeVal) }}</div>
                        <div class="re_inner_ext text-[20px]">Extra+0.00</div>
                    </div>

                    <div class="re_submit_btn" @click="handleSubmit"></div>
                </div>
                <p class="text-center re_text text-[28px] text-[#b17924] pt-[20px]">
                    Después de un pago exitoso, el sistema agregará el monto a su cuenta dentro de 1
                    a 5 minutos.
                </p>

                <div class="re_pop_bg01"></div>
                <div class="re_pop_bg02"></div>
            </div>
        </van-popup>

        <OderDetail ref="oderDetailRef" :active-val="activeVal" :on-success="handleSuccess" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import '@/assets/scss/rechargePop.scss'

const showBottom = ref(false)

const oderDetailRef = ref()
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

const activeVal = ref(100)

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
    oderDetailRef.value.open()
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
