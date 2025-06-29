<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-29 15:32:20
 * @FilePath: /vue3_app/src/views/Promoc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="retirar-debug" class="retirar-page p-[20px] text-[50px]">
        <HeaderBack :has-article="true" />
        <div class="retirar_info_container w-[1022px] h-[387px] mb-[20px]">
            <div class="retirar_info_top flex justify-between">
                <div class="retirar_info_top_left">
                    <div class="retirar_info_top_left_top flex items-center">
                        <div class="retirar_info_top_left_top_left">
                            <img :src="coinImg" alt="saldo de cuenta" class="w-[126px] h-[125px]">
                        </div>
                        <div
                            class="retirar_info_top_left_top_right text-[80px] font-bold text-gold ml-[27px]"
                        >
                            ${{ getCoinNum(0) }}
                        </div>
                    </div>
                    <div class="retirar_info_top_left_bottom py-[16px]">Saldo de cuenta</div>
                </div>
                <div
                    class="retirar_info_top_right flex items-center w-[93px] h-[105px] mt-[15px]"
                    @click="refreshCoin"
                ></div>
            </div>
            <div class="retirar_info_bottom pt-[30px] flex items-center">
                <span class="text-[40px]">Monto que se puede retirar: </span>
                <span class="pl-[7px]">
                    <img :src="coinImg" alt="saldo de cuenta" class="w-[47px] h-[47px] relative top-[5px]">
                </span>
                <span class="text-[40px] ml-[10px]"> ${{ getCoinNum(0) }} </span>
            </div>
        </div>
        <div class="retirar_section01 w-[1023px] mb-[26px] justify-center">
            <div
                v-for="item in countList"
                :key="item.id"
                class="countItem flex items-center justify-center"
                :class="{ active: activeCount === item.id }"
                @click="checkCount(item)"
            >
                ${{ getCoinNum(item.value) }}
            </div>
        </div>
        <div
            class="select_value_container w-[1017px] h-[132px] text-[70px] font-bold flex items-center"
        >
            ${{ getCoinNum(curValue) }}
        </div>
        <div
            class="retiara_btn_big w-[1022px] h-[152px] text-[50px] font-bold text-white text-center"
            @click="handleRetarir"
        >
            Retirar
        </div>
        <div class="retirar_record text-[35px]">
            <ul>
                <li
                    v-for="item in record"
                    :key="item.felicidades"
                    class="retirar_record_item flex items-center justify-between"
                >
                    <div class="flex items-center">
                        <span class="pr-[15px]">Felicidades</span>
                        <span class="color-[#fff] pr-[15px]">{{ item.felicidades }}</span>
                        <span class="pr-[15px]">Retirar</span>
                        <span class="color-[#fff] pr-[15px] color-[#fe0000]">{{
                            getCoinNum(item.retirar)
                        }}</span>
                    </div>
                    <div>{{ item.time }} minutos</div>
                </li>
            </ul>
        </div>

        <RetarirStep2 ref="retarirStep2Ref" :on-success="handleSuccess" :cur-value="curValue" />
    </div>
</template>

<script setup lang="ts">
import { showSuccessToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCoinNum } from '@/utils'
import '@/assets/scss/pages/retirar.scss'

defineOptions({
    name: 'Retirar',
})
const coinImg = '/images/retirar/coin.png'
const router = useRouter()
const curValue = ref(2)
const retarirStep2Ref = ref()
function refreshCoin() {
    showSuccessToast('Refrescar')
    console.log('refreshCoin')
}

function handleSuccess() {
    console.log('handleSuccess')
    // curValue.value = 1
    setTimeout(() => {
        activeCount.value = 1
        curValue.value = 2
    }, 500)
}

function handleRetarir() {
    retarirStep2Ref.value.open()
}

const activeCount = ref(1)
const countList = ref([
    {
        id: 1,
        value: 2,
    },
    {
        id: 2,
        value: 200,
    },
    {
        id: 3,
        value: 3000,
    },
    {
        id: 4,
        value: 5000,
    },
    {
        id: 5,
        value: 20000,
    },
    {
        id: 6,
        value: 50000,
    },
])

const record = ref([
    {
        felicidades: 9332233,
        retirar: 3000,
        time: 2,
    },
    {
        felicidades: 9332233,
        retirar: 3000,
        time: 2,
    },
    {
        felicidades: 9332233,
        retirar: 3000,
        time: 2,
    },
])

function checkCount(item: any) {
    activeCount.value = item.id
    curValue.value = item.value
    console.log(activeCount.value)
}

onMounted(async () => {})
</script>

<style scoped>
.retirar-page {
  min-height: 100vh;
  display: block;
  visibility: visible;
  opacity: 1;
  position: relative;
  z-index: 999;
  width: 100%;
  min-height: 200px;
}
</style>
