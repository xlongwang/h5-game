<template>
    <div class="retirar_header flex items-center">
        <div
            v-if="hasBackIcon"
            class="retirar_header_back w-[135px] h-[135px] flex items-center justify-center"
            @click="goBack"
        ></div>
        <div v-if="title" class="hasTitle">{{ title }}</div>
        <div
            v-if="hasArticle"
            class="retirar_header_article w-[94px] h-[83px]"
            @click="showRecord"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGlobal } from '@/composables'

defineOptions({
    name: 'HeaderBack',
})

defineProps<{
    hasArticle?: boolean
    hasBackIcon?: boolean
    title?: string
}>()

const router = useRouter()
const { i18n } = useGlobal()

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
    width: 58px;
    height: 42px;
    background: url("/images/apoyo/arrow.png") no-repeat;
    background-size: contain;
    content: "";
    transform: rotate(270deg);
  }
}

.retirar_header {
  height: 130px;
  position: relative;
}

.hasTitle {
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
