<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-23 11:06:20
 * @FilePath: /vue3_app/src/views/Promoc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="retirar-debug" class="retirar-page p-4">
        <h1 class="text-2xl font-bold">Retirar Page</h1>
        <p>Content for the Retirar page goes here.</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

defineOptions({
    name: 'Retirar',
})
const currentTime = ref('')
onMounted(async () => {
    console.log('Retirar page mounted')
    currentTime.value = new Date().toLocaleString()
})
</script>

<style scoped>
.retirar-page {
    min-height: 100vh;
    display: block;
    visibility: visible;
    opacity: 1;
    position: relative;
    z-index: 999;
    width: 100%;
    min-height: 200px;
}
</style>
