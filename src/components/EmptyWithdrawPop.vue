<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-07-06 14:01:37
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-06 16:23:24
 * @FilePath: /vue3_app/src/components/EmptyWithdrawPop.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
            <div class="empty-withdraw-pop-content-desc">
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
