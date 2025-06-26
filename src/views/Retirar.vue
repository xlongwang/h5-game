<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-23 11:06:20
 * @FilePath: /vue3_app/src/views/Promoc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="retirar-debug" class="retirar-page p-[20px] text-[50px]">
        <div class="retirar_header pt-[16px] pb-[40px] flex items-center justify-between">
            <div class="retirar_header_back w-[64px] h-[61px]">
            </div>
            <div class="retirar_header_article w-[94px] h-[83px]">
            </div>
        </div>
        <div class="retirar_info_container w-[1022px] h-[387px] mb-[20px]">
            <div class="retirar_info_top flex justify-between">
                <div class="retirar_info_top_left">
                    <div class="retirar_info_top_left_top flex items-center">
                        <div class="retirar_info_top_left_top_left">
                            <img :src="coinImg" alt="saldo de cuenta" class="w-[126px] h-[125px]">
                        </div>
                        <div class="retirar_info_top_left_top_right text-[80px] font-bold text-gold ml-[27px]">
                            ${{ getCoinImg(0) }}
                        </div>
                    </div>
                    <div class="retirar_info_top_left_bottom py-[16px]">Saldo de cuenta</div>
                </div>
                <div class="retirar_info_top_right flex items-center w-[93px] h-[105px] mt-[15px]" @click="refreshCoin"></div>
            </div>
            <div class="retirar_info_bottom flex items-center">
                <span class="text-[30px]">Monto que se puede retirar: </span>
                <span> <img :src="coinImg" alt="saldo de cuenta" class="w-[47px] h-[47px]"> </span>
                <span class="text-[40px] ml-[10px]"> ${{ getCoinImg(0) }} </span>
            </div>
        </div>
        <div class="retirar_section01 w-[1023px] mb-[26px] justify-center">
            <div
                v-for="item in countList" :key="item.id" class="countItem flex items-center justify-center"
                :class="{ active: activeCount === item.id }" @click="checkCount(item)"
            >
                ${{ getCoinImg(item.value) }}
            </div>
        </div>
        <div class="select_value_container w-[1017px] h-[132px] text-[70px] font-bold flex items-center">
            ${{ getCoinImg(curValue) }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import '@/assets/scss/pages/retirar.scss'

defineOptions({
    name: 'Retirar',
})
const curValue = ref(0)
function getCoinImg(val: number) {
    return Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function refreshCoin() {
    console.log('refreshCoin')
}

const coinImg = '/images/retirar/coin.png'

const activeCount = ref(0)
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

function checkCount(item: any) {
    activeCount.value = item.id
    curValue.value = item.value
    console.log(activeCount.value)
}

onMounted(async () => {

})
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
