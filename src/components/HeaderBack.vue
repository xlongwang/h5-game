<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-29 14:13:22
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-29 14:51:09
 * @FilePath: /vue3_app/src/components/headerBack.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="retirar_header flex items-center">
        <div 
            v-if="hasBackIcon"
            class="retirar_header_back w-[135px] h-[135px] flex items-center justify-center"
            @click="goBack"
        ></div>
        <div v-if="title" class="hasTitle">{{ title }}</div>
        <div v-if="hasArticle" class="retirar_header_article w-[94px] h-[83px]" @click="showRecord"></div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
    name: 'HeaderBack',
})

defineProps<{
    hasArticle?: boolean,
    hasBackIcon?: boolean
    title?: string
}>()

const router = useRouter()

function goBack() {
    router.back()
}
function showRecord() {
    router.push('/record')
}
</script>

<style scoped lang="scss">
.retirar_header_back {
  position: absolute;
  left: 0;
  top: 0;
  &::before {
    display: block;
    width: 66px;
    height: 66px;
    background: url("/images/apoyo/arrow.png") no-repeat;
    background-size: contain;
    content: "";
    transform: rotate(270deg);
  }
}

.retirar_header{
  height: 130px;
  position: relative;
}

.hasTitle{
  line-height: 66px;
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  color: #f3d658;
  width: 100%;
  padding-top: 10px;
  
}

.retirar_header_article {
  background: url("/images/retirar/text_icon.png") no-repeat;
  background-size: 100% 100%;
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>
