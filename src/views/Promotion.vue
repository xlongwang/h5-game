<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-23 21:25:51
 * @FilePath: /vue3_app/src/views/Promoc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="promotion-debug" class="promotion-page p-4">
        <h1 class="text-2xl font-bold">Promotion Page</h1>
        <p>Content for the promotion page goes here.</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// import { useRoute } from 'vue-router'

const currentTime = ref('')
// const route = useRoute()

const list = ref([{
    id: '1',
    url: '/images/promotion/a1.png',
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
    display: block;
    visibility: visible;
    opacity: 1;
    min-height: 200px;
}
</style>
