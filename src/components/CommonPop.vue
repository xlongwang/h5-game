<!--
 * @Author: along longwang6@163.com
 * @Date: 2025-07-06 14:03:09
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-06 15:51:48
 * @FilePath: /vue3_app/src/components/CommonPop.vue
 * @Description: 通用弹窗组件
-->
<template>
    <van-popup
        v-model:show="showCenter"
        round
        class="common-pop"
        position="center"
        @update:show="handleUpdateShow"
        @close="handleCancel"
    >
        <div class="common-pop-inner">
            <div class="common-pop-title font_cinze text-[60px] font-bold text-center">
                {{ title }}
            </div>
            <div class="common-pop-content">
                <slot></slot>
            </div>
            <div class="common-pop-footer">
                <slot name="footer">
                    <div v-if="!isSingleBtn" class="common-pop-footer-btns">
                        <div class="common-pop-footer-btn-cancel font-bold" @click="handleCancel">
                            {{ cancelText || t("components.cancel") }}
                        </div>
                        <div class="common-pop-footer-btn-confirm font-bold" @click="handleConfirm" :class="{ 'loading': loading }">
                            <span v-if="loading" class="loading-spinner"></span>
                            {{ confirmText || t("components.confirm") }}
                        </div>
                    </div>
                    <div v-else class="common-pop-footer-btn-single font-bold">
                        <div class="common-pop-footer-btn-single-btn text-[50px]" @click="handleConfirm" :class="{ 'loading': loading }">
                            <span v-if="loading" class="loading-spinner"></span>
                            {{ confirmText || t("components.confirm") }}
                        </div>
                    </div>
                </slot>
            </div>
            <div v-if="tips" class="common-pop-tips font-bold text-[40px] text-center">
                {{ tips }}
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

const props = withDefaults(
    defineProps<{
        title: string
        isSingleBtn?: boolean
        cancelText?: string
        confirmText?: string
        modelValue?: boolean
        tips?: string
        loading?: boolean
    }>(),
    {
        isSingleBtn: false,
        cancelText: '',
        confirmText: '',
        modelValue: false,
        loading: false,
    },
)

const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'confirm'): void
    (e: 'update:modelValue', value: boolean): void
}>()

const { i18n } = useGlobal()
const { t } = i18n

const showCenter = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
})

function handleUpdateShow(value: boolean) {
    emit('update:modelValue', value)
}

function handleCancel() {
    emit('cancel')
    showCenter.value = false
}

function handleConfirm() {
    if (props.loading) return
    emit('confirm')
    // 不在loading状态下自动关闭弹窗，让父组件决定何时关闭
    // showCenter.value = false
}


// 暴露方法供父组件调用
function open() {
    showCenter.value = true
}

function close() {
    showCenter.value = false
}



defineExpose({
    open,
    close,
})
</script>

<style scoped lang="scss">
.common-pop {
  width: 993px;
  max-width: 95vw;
  border-radius: 32px;
  background: transparent;
  // border: 4px solid #ffd700;
  // box-shadow: 0 0 32px 4px #ffecb3, 0 0 0 4px #b9851f inset;
  padding: 18px 24px 18px;
  box-sizing: border-box;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 64px;
    pointer-events: none;
    border: 64px solid transparent;
    border-image: url("/images/main/border.png") 64 fill stretch;
    z-index: 2;
  }
}

.empty-withdraw-pop-content-desc{
  word-break: break-all;
}

.common-pop-inner{
  background-color: #1a0e00;
  padding: 60px 50px 60px;
  word-break: break-all;
}

.common-pop-title {
  font-family: "CinzelDecorative-Bold", serif;
  font-size: 64px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
  background: linear-gradient(90deg, #ffe066 30%, #ffd700 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
}

.common-pop-content {
  color: #ffe066;
  font-size: 32px;
  line-height: 1.4;
  margin-bottom: 40px;
  min-height: 40px;
  word-break: break-word;
  text-align: left;
}

.common-pop-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding-bottom: 30px;

  .common-pop-footer-btns {
    display: flex;
    width: 100%;
    gap: 32px;
    justify-content: center;
 }
}

.common-pop-footer-btn-cancel {
  width: 375px;
  height: 103px;
  background: url("/images/main/ok.png") no-repeat;
  background-size: contain;
  line-height: 103px;
  text-align: center;
  color: #f2d659;
  font-size: 45px;
  font-weight: bold;
}

.common-pop-footer-btn-confirm {
  width: 403px;
  height: 103px;
  background: url("/images/main/cancel.png") no-repeat;
  background-size: contain;
  line-height: 103px;
  text-align: center;
  color: #0c0900;

  font-size: 45px;
  font-weight: bold;
}

.common-pop-footer-btn-single-btn {
  width: 870px;
  height: 116px;
  background: url("/images/common/big_btn.png") no-repeat center center;
  background-size: 100% 100%;
  margin: 0 auto 0;
  line-height: 116px;
  text-align: center;
  color: #250d00;
}

.common-pop-tips{
  word-break: break-all;
  text-align: left;
  padding-top: 10px;
  line-height: 1.4;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading {
  opacity: 0.7;
  pointer-events: none;
}
</style>
