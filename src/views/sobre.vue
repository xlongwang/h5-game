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
            <div class="sobre-page-con-title">
                <div class="sobre-page-con-title-span">
                    {{ t('about.aboutUs') }}
                </div>
            </div>
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
  padding: 0 10px 320px;
}
.sobre-page-con {
  width: 945px;
  margin: 0 auto;
  min-height: 807px;
  border: 16px solid transparent;
  border-radius: 32px;
  border-image: url('/images/sobre/bg.png') 16 fill stretch;
  box-sizing: border-box;
  padding: 0 0 60px;
}

.sobre-page-con-text {
  word-break: break-all;
  padding: 40px 30px 10px
}

.sobre-page-con-title {
  height: 115px;
  font-size: 50px;
  text-align: left;
  margin-top: 40px;
  position: relative;
    &::after{
     content: '';
     display: block;
     width: 933px;
     position: absolute;
     left: -10px;
     bottom: 0;
     height: 3px;
     background: linear-gradient(to right, #573a07 0%, #b4821d 50%, #573a07 100%);
   }
}

.sobre-page-con-title-span{
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
    background: url("./images/sobre/line.png") no-repeat center center;
    background-size: contain;
  }
}
</style>
