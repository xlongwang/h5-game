<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-07-06 10:02:00
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-15 11:44:58
 * @FilePath: /vue3_app/src/components/empty-components.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
