<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-01 19:35:48
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
                            ${{ (Number(userInfo?.wallet?.balance) + Number(userInfo?.wallet?.bonus)).toFixed(2) || '0.00' }}
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
                    <img
                        :src="coinImg"
                        alt="saldo de cuenta"
                        class="w-[47px] h-[47px] relative top-[5px]"
                    >
                </span>
                <span class="text-[40px] ml-[10px]">
                    ${{ userInfo?.wallet?.balance || '0.00' }}
                </span>
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
            <div class="record-scroll-container">
                <div class="record-scroll-content">
                    <div
                        v-for="item in recordList"
                        :key="`${item.id}-${item.time}`"
                        class="retirar_record_item flex items-center justify-between"
                    >
                        <div class="flex items-center pl-[15px] pr-[15px]">
                            <span class="pr-[15px]">Felicidades</span>
                            <span class="color-[#fff] pr-[15px]">{{ item.id }}</span>
                            <span class="pr-[15px]">Retirar</span>
                            <span class="color-[#fff] pr-[15px] color-[#fe0000]">{{
                                item.amount
                            }}</span>
                        </div>
                        <div>{{ item.time }} minutos</div>
                    </div>
                </div>
            </div>
        </div>

        <RetarirStep2
            ref="retarirStep2Ref"
            :on-success="handleSuccess"
            :cur-value="curValue"
        />
    </div>
</template>

<script setup lang="ts">
import { showSuccessToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '@/api/user-api'
import { useGlobal } from '@/composables'
import { getMarqueeData } from '@/config'
import { getCoinNum } from '@/utils'

// import { StorageUtil } from '@/utils/storage'
import '@/assets/scss/pages/retirar.scss'

defineOptions({
    name: 'Retirar',
})

// 生成循环滚动的记录数据
function generateScrollData() {
    const data = getMarqueeData()
    // 复制一份数据用于无缝循环
    return [...data, ...data]
}

const { userStore } = useGlobal()

const recordList = ref(generateScrollData())
const activeCount = ref(1)
const userInfo = computed(() => {
    return userStore.userInfo
})

const coinImg = '/images/retirar/coin.png'
const router = useRouter()
const curValue = ref(2)
const retarirStep2Ref = ref()
async function refreshCoin() {
    try {
        showSuccessToast('Refrescar')
        console.log('refreshCoin')

        // 刷新用户信息
        await userStore.fetchUserInfo()

        showSuccessToast('Información actualizada')
        console.log('用户信息刷新成功')
    }
    catch (error) {
        console.error('刷新用户信息失败:', error)
        showSuccessToast('Error al actualizar')
    }
}

function handleSuccess() {
    // curValue.value = 1
    setTimeout(() => {
        activeCount.value = 1
        curValue.value = 2
    }, 500)
}

async function handleRetarir() {
    // if (curValue.value > Number(userInfo.value?.wallet?.balance)) {
    //     showSuccessToast('Saldo insuficiente')
    //     return
    // }

    if (!userInfo.value?.receiving_account) {
        retarirStep2Ref.value.open()
    }
    else {
    // try {
    //     await userApi.createPayin({
    //         amount: curValue.value.toString(),
    //         player_id: userInfo.value?.id.toString(),
    //     })
    //     router.push(`/retirarDetail?amount=${curValue.value}`)
    // }
    // catch (error) {
    //     console.error('创建代收订单失败:', error)
    //     showSuccessToast('创建代收订单失败')
    // }

        router.push(`/retirarDetail?amount=${curValue.value}`)
    }
}

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

// const record = ref([
//     {
//         felicidades: 9332233,
//         retirar: 3000,
//         time: 2,
//     },
//     {
//         felicidades: 9332233,
//         retirar: 3000,
//         time: 2,
//     },
//     {
//         felicidades: 9332233,
//         retirar: 3000,
//         time: 2,
//     },
// ])

function checkCount(item: any) {
    activeCount.value = item.id
    curValue.value = item.value
}

onMounted(async () => {
    // 页面加载时自动获取用户信息
    if (!userStore.userInfo) {
        try {
            await userStore.autoLogin()
        }
        catch (error) {
            console.error('自动登录失败:', error)
        }
    }
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

/* 记录滚动容器 */
.record-scroll-container {
  height: 300px;
  overflow: hidden;
  position: relative;
}

.record-scroll-content {
  animation: scrollUp 20s linear infinite;
}

.record-scroll-content:hover {
  animation-play-state: paused;
}

@keyframes scrollUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.retirar_record_item {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.retirar_record_item:last-child {
  border-bottom: none;
}
</style>
