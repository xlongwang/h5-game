<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 12:13:49
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-02 16:26:34
 * @FilePath: /vue3_app/src/views/Promoc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="apoyo_page p-[20px] text-[50px]">
        <HeaderBack :has-back-icon="true" :title="t('support.title')" />
        <div class="apoyo_page_scroll">
            <div class="pb-[350px]">
                <div class="mb-[40px] w-[1045px] h-[608px] mx-auto" @click="handleBannerClick">
                    <img :src="bannerImg" alt="" class="w-full">
                </div>
                <div class="mb-[30px] font-bold w-[1045px] mx-auto">
                  {{ t('components.apoyoCommonProblem') }}
                </div>
                <van-collapse v-model="activeNames" accordion>
                    <van-collapse-item :title="t('support.howToWithdraw')" name="1">
                        {{ t('support.faqAnswer1') }}
                    </van-collapse-item>
                    <van-collapse-item :title="t('support.isPlatformTrustworthy')" name="2">
                        {{ t('support.faqAnswer1') }}
                    </van-collapse-item>
                    <van-collapse-item
                        :title="t('support.depositProblem')"
                        name="3"
                    >
                        {{ t('support.faqAnswer1') }}
                    </van-collapse-item>

                    <van-collapse-item
                        :title="t('support.gameLoadingSlow')"
                        name="4"
                    >
                        {{ t('support.faqAnswer2') }}
                    </van-collapse-item>

                    <van-collapse-item :title="t('support.withdrawalFailed')" name="5">
                        {{ t('support.faqAnswer3') }}
                    </van-collapse-item>
                </van-collapse>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

import '@/assets/scss/pages/apoyo.scss'

defineOptions({
    name: 'Apoyo',
})

const { i18n } = useGlobal()
const { t } = i18n

const bannerImg = '/images/apoyo/header.png'
const router = useRouter()
const activeNames = ref<string | number>('') // 单开模式

function handleBannerClick() {
    window.open('https://www.baidu.com', '_blank')
}
</script>

<style scoped lang="scss">
.apoyo_page {
  height: 100vh;
  overflow-y: auto;
}
.apoyo_page_scroll{
    height: calc(100vh - 300px);
    overflow-y: auto;
    font-size: 45px;
}
:deep(.van-cell) {
  background-color: #1d0f02;
  //   height: 145px;
  box-sizing: border-box;
  border: 4px solid #e69110;
  //   border-top: none;
  border-radius: 0px;
  position: relative;
  z-index: 2;
  &::after {
    border: none;
  }
}
:deep(.van-collapse-item__title) {
  font-size: 40px;
  color: #ffd84c;
  background: #231600;
  border-radius: 20px;
  word-break: break-all;
}
:deep(.van-collapse-item__content) {
  font-size: 34px;
  color: #ffd84c;
  background: #231600;
  word-break: break-all;

  border-top: none;
  padding: 30px 30px 30px 30px;
}

:deep(.van-collapse-item__wrapper) {
  position: relative;
  top: -14px;
  border: 4px solid #e69110;
  border-top: none;
  border-radius: 0 0 20px 20px;
}

:deep(.van-collapse-item) {
  // border: 4px solid #e69110;
  // border-radius: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

:deep(.van-hairline--top-bottom) {
  &::after {
    display: none;
  }
}
:deep(.van-collapse-item--border:after) {
  border: none;
}

:deep(.van-cell__right-icon) {
  &::before {
    content: "";
    display: block;
    width: 66px;
    height: 66px;
    background: url("/images/apoyo/right_arrow.png") no-repeat;
    background-size: 100% 100%;
    transform: rotate(0);
  }
}

:deep(.van-collapse-item__title--expanded .van-cell__right-icon:before) {
  transform: rotate(180deg);
}
</style>
