<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-23 11:02:21
 * @FilePath: /vue3_app/src/views/Promoc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="promotion-debug" style="background: red !important; color: white !important; padding: 50px !important; text-align: center !important; font-size: 24px !important; position: relative !important; z-index: 999 !important; width: 100% !important; display: block !important; visibility: visible !important; opacity: 1 !important; min-height: 200px !important;">
        <h1>PROMOTION PAGE</h1>
        <p>如果你能看到这个，说明路由工作正常</p>
        <p>当前时间: {{ currentTime }}</p>
        <p>路由路径: {{ route.path }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const currentTime = ref('')
const route = useRoute()

onMounted(() => {
    currentTime.value = new Date().toLocaleString()
})
</script>

<style scoped>
#promotion-debug {
    background: red;
    color: white;
    padding: 50px;
    text-align: center;
    font-size: 24px;
    position: relative;
    z-index: 999;
    width: 100%;
    display: block;
    visibility: visible;
    opacity: 1;
    min-height: 200px;
}
</style>
