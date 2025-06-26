<template>
    <div class="header-info flex items-center">
        <div class="header-avatar mr-[18px]">
            <img :src="userInfo.avatar">
        </div>
        <div class="header-info-right text-[50px]">
            <div class="header-info-right-name pb-[30px]">
                <span>
                    Apodo: {{ userInfo.name }}
                </span>
            </div>
            <div class="header-info-right-bt flex items-center">
                <div class="header-info-right-bt-id">
                    ID: {{ userInfo.id }}
                </div>
                <div class="header-info-right-bt-dollor flex items-center ml-[40px]">
                    <div class="dollor-icon"></div>
                    <div class="dollor-count font-bold ml-[16px]">{{ (userInfo.dollor).toFixed(2) }}</div>
                </div>
                <div class="header-refresh ml-[30px]"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@/assets/scss/header.scss'

defineOptions({
    name: 'HeaderInfo',
})

const userInfo = ref({
    name: 'usuario1878888',
    avatar: '/images/perfil/avatar.png',
    id: 9781653,
    dollor: 29,
})
</script>

<style scoped>

</style>
