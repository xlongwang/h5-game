<template>
    <van-popup
        v-model:show="showCenter"
        :close-on-click-overlay="false"
        :style="{ background: 'transparent', ...popupStyle }"
        class="first-login-popup"
    >
        <div v-show="showPop1" class="first-login-container pop1">
            <div class="first-pop1-txt"></div>
            <div class="first-pop1-image"></div>
            <div class="firt-pop1-conent">
                {{ $t('firstLogin.pop1.welcome') }}
            </div>
            <div class="first-pop1-money">{{ $t('firstLogin.pop1.rewardRange') }}</div>
            <div class="first-pop1-bt">{{ $t('firstLogin.pop1.goClaim') }}</div>
            <div class="first-pop1-btn" @click="goNext">
                {{ $t("firstLogin.pop1.btn") }}
            </div>
        </div>

        <div v-show="showPop2" class="first-login-container pop2">
            <div class="first-pop2-txt"></div>
            <div class="first-pop2-image"></div>
            <div class="firt-pop1-conent firt-pop2-conent">
                {{ $t('firstLogin.pop2.congratulations') }}
            </div>
            <div class="first-pop1-money">R$ {{ (userInfo?.registration_reward || 0).toFixed(2) }}</div>
            <div class="first-pop1-bt">{{ $t('firstLogin.pop2.goClaim') }}</div>
            <div class="first-pop1-btn" @click="goLast">
                {{ $t("firstLogin.pop2.btn") }}
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/use-user-store'
import { StorageUtil } from '@/utils/storage'
import { useGlobal } from '@/composables'

defineOptions({
    name: 'FirstLogin',
})

const { i18n } = useGlobal()
const { t } = i18n

const userStore = useUserStore()

const showCenter = ref(false)

const showPop1 = ref(true)
const showPop2 = ref(false)

const userInfo = computed(() => {
    return userStore.userInfo
})

// 动态设置CSS变量用于多语言图片
const popupStyle = computed(() => ({
    '--pop1-slogan-bg': `url('${t('firstLogin.pop1.images.slogan')}')`,
    '--pop2-slogan-bg': `url('${t('firstLogin.pop2.images.slogan')}')`,
}))

function close() {
    showCenter.value = false
}

function open() {
    showCenter.value = true
}

function goNext() {
    showPop1.value = false
    showPop2.value = true
}

function goLast() {
    StorageUtil.setIsFirst(false)
    close()
}

defineExpose({
    showCenter,
    close,
    open,
})
</script>

<style scoped lang="scss">
::v-deep(.van-overlay) {
  background: rgba(0, 0, 0, 0.4) !important;
}

.first-pop1-txt {
  width: 806px;
  height: 214px;
  background: var(--pop1-slogan-bg, url(/images/guide/pop1/slogan.png)) no-repeat;
  background-size: contain;
  margin: 0 auto;
  // 样式内容
}

.first-pop1-image {
  width: 806px;
  height: 518px;
  background: url(/images/guide/pop1/gift.png) no-repeat;
  background-size: contain;
}

.firt-pop1-conent {
  font-size: 38px;
  width: 810px;
  margin: 0 auto;
  color: #d59c11;
  word-break: break-all;
  &.firt-pop2-conent {
    width: 680px;
    font-size: 43px;
  }
}

.first-pop1-money {
  text-align: center;
  font-size: 60px;
  font-weight: bold;
  color: #fed201;
  margin-top: 40px;
}

.first-pop1-bt {
  color: #fed201;
  text-align: center;
  font-size: 35px;
  margin-top: 20px;
}

.first-pop1-btn {
  width: 360px;
  height: 95px;
  background: url(/images/guide/pop1/btn.png) no-repeat;
  background-size: contain;
  margin: 40px auto 0;
  text-align: center;
  color: #381406;
  line-height: 95px;
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
}

.first-pop2-txt {
  width: 806px;
  height: 214px;
  background: var(--pop2-slogan-bg, url(/images/guide/pop2/slogan.png)) no-repeat;
  background-size: contain;
  margin: 0 auto;
}

.first-pop2-image {
  width: 756px;
  height: 636px;
  background: url(/images/guide/pop2/rich.png) no-repeat;
  background-size: contain;
  margin: -30px auto 0;
}

.first-pop2-btn {
  width: 360px;
  height: 95px;
  background: url(/images/guide/pop2/btn.png) no-repeat;
  background-size: contain;
  margin: 30px auto 0;
}
</style>
