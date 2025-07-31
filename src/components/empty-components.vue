<template>
    <div class="text-center text-[50px] pt-[300px]">{{ title || t('common.title') }}</div>
</template>

<script lang="ts" setup>
import { withDefaults } from 'unplugin-vue-macros/macros' assert { type: 'macro' }
import { useGlobal } from '@/composables'

defineOptions({
    name: 'EmptyComponents',
})

const { i18n } = useGlobal()
const { t } = i18n

const { title } = withDefaults(definePropsRefs<{
    title?: string
}>(), {
    title: 'title',
})
</script>
