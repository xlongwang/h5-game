<template>
    <CommonPop
        key="empty-withdraw-pop"
        v-model="show"
        :title="t('components.emptyWithdrawPopTitle')"
        :is-single-btn="true"
        :cancel-text="t('components.cancel')"
        :confirm-text="t('components.confirm')"
        @cancel="handleCancel"
        @confirm="handleConfirm"
    >
        <div class="empty-withdraw-pop-content">
            <div class="empty-withdraw-pop-content-desc text-[40px]">
                {{ t("components.emptyWithdrawPopDesc") }}
            </div>
        </div>
    </CommonPop>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

const show = ref(false)

const { i18n } = useGlobal()
const { t } = i18n

function handleCancel() {
    show.value = false
}

function handleConfirm() {
    show.value = false
}

function open() {
    show.value = true
}

defineExpose({
    open,
})
</script>
