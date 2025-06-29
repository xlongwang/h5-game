<template>
    <div class="perfil-page">
        <div class="apoyo_icon" @click="handleClick('/apoyo')"></div>
        <!-- <HeaderBack /> -->

        <div class="section01">
            <div class="section01_left">
                <div class="section01_left_top w-[294px] h-[290px] flex items-center justify-center">
                    <img @click="handleClick('/retirar')" :src="retirarImg" alt="retirar" class="w-[232px] h-[245px]">
                </div>
                <div class="section01_left_bottom font-bold text-[50px]">Retirar</div>
            </div>
            <div class="section01_right text-center">
                <div class="section01_right_top w-[294px] h-[290px] flex items-center justify-center">
                    <img @click="handleDeposito" :src="depositoImg" alt="deposito" class="w-[294px] h-[268px]">
                </div>
                <div class="section01_right_bottom font-bold text-[50px]">Depositio</div>
            </div>
        </div>

        <div class="section02">
            <div class="section02_item flex items-center text-[50px]" @click="handleClick('/invite')">
                <div class="section02_item_left w-[87px] h-[78px] mr-[16px]"></div>
                <div class="section02_item_con flex-1" >Invitar</div>
                <div class="section02_item_right flex items-center">
                    <div class="section02_item_right_top">millon meensual</div>
                    <div class="section02_item_right_arr w-[40px] h-[47px] ml-[16px]"></div>
                </div>
            </div>
            <div class="section02_item flex items-center text-[50px]">
                <div class="section02_item_left2 w-[88px] h-[69px] mr-[16px]"></div>
                <div class="section02_item_con flex-1">Idioma</div>
                <div class="section02_item_right flex items-center">
                    <div class="section02_item_right_top">Spanish</div>
                    <div class="section02_item_right_arr w-[40px] h-[47px] ml-[16px]"></div>
                </div>
            </div>
            <div class="section02_item flex items-center text-[50px]" @click="handleClick('/sobre')">
                <div class="section02_item_left3 w-[88px] h-[73px] mr-[16px]"></div>
                <div class="section02_item_con flex-1">Sobre</div>
                <div class="section02_item_right flex items-center">
                    <div class="section02_item_right_top"></div>
                    <div class="section02_item_right_arr w-[40px] h-[47px] ml-[16px]"></div>
                </div>
            </div>
        </div>
        <RechargPop ref="rechargPopRef" />
    </div>
</template>

<script setup lang="ts">
// 从 public 目录引用图片
// import retirarImg from '@/assets/images/perfil/retirar_icon.png'
import '@/assets/scss/pages/perfil.scss'
import { useRouter } from 'vue-router'
const router = useRouter()
const rechargPopRef = ref()
defineOptions({
    name: 'Perfil',
})
function handleDeposito() {
    rechargPopRef.value.open()
}
function handleRetirar() {
    router.push('/retirar')
}
function handleClick(path: string) {
    router.push(path)
}

const depositoImg = '/images/perfil/deposito_icon.png'
const retirarImg = '/images/perfil/retirar.png'
</script>
