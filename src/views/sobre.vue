<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-29 20:47:26
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-08 09:45:54
 * @FilePath: /vue3_app/src/views/sobre.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="sobre-page">
        <header-back :title="t('about.title')" :has-back-icon="true" />
        <div class="sobre-page-con">
            <div class="sobre-page-con-title">{{ t('about.aboutUs') }}</div>
            <div class="sobre-page-con-text text-[45px] pt-[40px] line-height-[1.5]">
                {{ t('about.description') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

defineOptions({
    name: 'SobrePage',
})

const { i18n } = useGlobal()
const { t } = i18n
</script>

<style scoped lang="scss">
.sobre-page {
  padding: 0 10px 300px;
}
.sobre-page-con {
  width: 945px;
  margin: 0 auto;
  height: 1707px;
  background: url("/images/sobre/bg.png") no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 40px 30px 0;
}

.sobre-page-con-text {
  word-break: break-all;
}

.sobre-page-con-title {
  height: 115px;
  font-size: 50px;
  width: 426px;
  text-align: center;
  position: relative;
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
    width: 233px;
    height: 11px;
    background: url("/images/sobre/line.png") no-repeat center center;
    background-size: contain;
  }
}
</style>
