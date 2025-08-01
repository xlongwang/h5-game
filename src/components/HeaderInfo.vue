<template>
    <div class="header-info flex items-center">
        <div class="header-avatar mr-[18px]">
            <img :src="userInfoLocal.avatar">
        </div>
        <div class="header-info-right text-[50px]">
            <div class="header-info-right-name pb-[30px]">
                <span v-if="userInfo.name"> {{ t('components.nickname') }}: {{ userInfo.name }} </span>
            </div>
            <div class="header-info-right-bt flex items-center">
                <div v-if="userInfo.id" class="header-info-right-bt-id">ID: {{ userInfo.id }}</div>
                <div class="header-info-right-bt-dollor flex items-center ml-[40px]">
                    <div class="dollor-icon"></div>
                    <div class="dollor-count font-bold ml-[16px]">{{ count }}</div>
                </div>
                <div
                    class="header-refresh ml-[30px]"
                    :class="{ rotating: isRotating }"
                    @click="refreshCoin"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { showSuccessToast } from 'vant'
import { useGlobal } from '@/composables'
import '@/assets/scss/header.scss'

defineOptions({
    name: 'HeaderInfo',
})

const props = defineProps<{
    userInfo: any
}>()

const { userStore, i18n } = useGlobal()
const { t } = i18n

const isRotating = ref(false)

const count = computed(() => {
    const banance
    = Number(props.userInfo.wallet.balance) + Number(props.userInfo.wallet.bonus)
    return banance.toFixed(2)
})

const userInfoLocal = ref({
    name: 'usuario1878888',
    avatar: '/images/perfil/avatar.png',
    id: 9781653,
    dollor: 29,
})

async function refreshCoin() {
    try {
        isRotating.value = true
        showSuccessToast(t('components.refresh'))
        console.log('refreshCoin')

        // 刷新用户信息
        await userStore.fetchUserInfo()

        showSuccessToast(t('components.refreshSuccess'))
        console.log('用户信息刷新成功')
    }
    catch (error) {
        console.error('刷新用户信息失败:', error)
        showSuccessToast(t('components.refreshFailed'))
    }
    finally {
        // 延迟重置旋转状态，确保动画完成
        setTimeout(() => {
            isRotating.value = false
        }, 1000)
    }
}
</script>

<style scoped>
.header-refresh {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.header-refresh.rotating {
    animation: rotate360 1s linear;
}

@keyframes rotate360 {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
