<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-06-29 18:44:30
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-02 16:07:58
 * @FilePath: /vue3_app/src/views/Activity02.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="activity01_page">
        <HeaderBack :has-back-icon="true" :title="t('activity.newUserTasks')" />
        <div class="activity01_content">
            <div class="act_header w-[1043px] h-[529px] mx-auto">
                <img class="w-[100%] h-[100%]" :src="headerImg" alt="">
                <div class="absolute top-[100px] left-[42px] w-[478px] h-full flex items-center justify-center">
                    <div class="text-[34px] text-[#f3d558]">{{ txt }}</div>
                </div>
            </div>
            <div class="act_btn w-[1046px] h-[143px] mx-auto mt-[53px]">
                {{ t('activity.receive') }} ${{ formatNumber(USER_REWARD) }}
            </div>
            <div class="text-center w-[1046px] h-[143px] mx-auto mt-[33px] text-[40px]">
                {{ t('activity.completeTasks') }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'
import { USER_REWARD } from '@/config/NumberConfig'
import { formatNumber } from '@/utils/tools'

defineOptions({
    name: 'Activity02',
})
const { i18n } = useGlobal()
const { t } = i18n

const headerImg = '/images/activity/a1.png'

const txt = computed(() => `${t('activity02.completeTaskText')} $${(USER_REWARD).toFixed(2)}`)
</script>

<style lang="scss" scoped>
.activity01_page {
  padding-bottom: 300px;
}
.act_header{
    position: relative;
}
.act_btn{
  background: url("/images/activity/btn_bg.png") no-repeat center center;
  background-size: 100% 100%;
  font-size: 60px;
  font-weight: bold;
  color: #f3d658;
  color: #0c0701;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
