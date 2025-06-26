<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-23 21:25:51
 * @FilePath: /vue3_app/src/views/Promoc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="promotion-debug" class="promotion-page">
        <ul class="promotion-list">
            <li v-for="item in list" :key="item.id">
                <img :src="item.url" :alt="item.name">
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import '@/assets/scss/pages/promotion.scss'

// import { useRoute } from 'vue-router'

const currentTime = ref('')
// const route = useRoute()

const list = ref([{
    id: '1',
    name: 'a1',
    url: '/images/promotion/a1.png',
},
{
    id: '2',
    name: 'a2',
    url: '/images/promotion/a2.png',
},
{
    id: '3',
    name: 'a3',
    url: '/images/promotion/a1.png',
},
{
    id: '4',
    name: 'a4',
    url: '/images/promotion/a2.png',
},
{
    id: '5',
    name: 'a5',
    url: '/images/promotion/a1.png',
},
{
    id: '6',
    name: 'a6',
    url: '/images/promotion/a2.png',
}])

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
