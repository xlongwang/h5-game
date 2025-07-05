<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-05 22:32:44
 * @FilePath: /vue3_app/src/views/Promoc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="promotion-debug" class="promotion-page">
        <header-back :title="t('nav.promotion')" />
        <ul class="promotion-list">
            <li v-for="item in list" :key="item.id">
                <img :src="item.url" :alt="item.name" @click="handleClick(item)">
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGlobal } from '@/composables'

import '@/assets/scss/pages/promotion.scss'

const { i18n } = useGlobal()
const { t } = i18n

const currentTime = ref('')
const router = useRouter()

function handleClick(item: any) {
    router.push(item.path)
}
const list = ref([
    {
        id: '1',
        name: 'a1',
        url: '/images/promotion/a1.png',
        path: '/activity01',
    },
    {
        id: '2',
        name: 'a2',
        url: '/images/promotion/a2.png',
        path: '/activity02',
    },
    {
        id: '3',
        name: 'a3',
        url: '/images/promotion/a3.png',
        path: '/invite',
    },
])

onMounted(() => {
    currentTime.value = new Date().toLocaleString()
})
</script>

<style scoped>
#promotion-debug {
    text-align: left;
    position: relative;
    z-index: 999;
    width: 100%;
}
</style>
