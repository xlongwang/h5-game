<template>
    <Teleport to="body">
        <CommonPop
            key="empty-withdraw-pop"
            v-model="show"
            :title="t('components.emptyWithdrawPopTitle')"
            :is-single-btn="false"
            :cancel-text="t('components.cancel')"
            :confirm-text="t('finance.deposit')"
            @cancel="handleCancel"
            @confirm="handleConfirm"
        >
            <div class="empty-withdraw-pop-content">
                <div class="empty-withdraw-pop-content-desc text-[40px]">
                    {{ t('components.notVipMember') }}
                </div>
            </div>
        </CommonPop>
        <OderDetailRecharge
            ref="OderDetailRecargelRef"
            :on-success="handleSuccess"
            :default-val="20"
        />
    </Teleport>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

const show = ref(true)
const OderDetailRecargelRef = ref()

const { i18n } = useGlobal()
const { t } = i18n

function handleSuccess() {
    show.value = false
    // props.onSuccess()
}

function handleCancel() {
    show.value = false
}

function handleConfirm() {
    show.value = false
    OderDetailRecargelRef.value.open()
}

function open() {
    show.value = true
}

defineExpose({
    open,
})
</script>
