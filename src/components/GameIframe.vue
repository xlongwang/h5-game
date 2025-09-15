<template>
  <!-- 游戏 iframe 覆盖层 -->
  <Teleport to="body">
    <div v-if="visible" class="game-iframe-overlay">
      <div v-if="showCloseBtn" class="game-iframe-header">
        <div class="close-btn-back" @click="handleClose">
          <!-- 关闭按钮背景图 -->
        </div>
      </div>
      <iframe
        v-if="gameUrl"
        ref="gameIframeRef"
        :src="gameUrl"
        class="game-iframe"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </Teleport>

  <!-- 游戏加载状态 -->
  <van-overlay v-if="loading" :show="true" class="game-loading-overlay">
    <div class="game-loading-content">
      <van-loading type="spinner" color="#ffd700" size="32px">
        {{ t("common.loading") }}
      </van-loading>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  visible: boolean
  gameUrl: string
  loading?: boolean
  showCloseBtn?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'update:visible', value: boolean): void
  (e: 'update:loading', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  showCloseBtn: true
})

const emit = defineEmits<Emits>()

const { t } = useI18n()
const gameIframeRef = ref<HTMLIFrameElement>()

// 监听游戏iframe消息
const handleMessage = (event: MessageEvent) => {
  // 确保消息来源安全
  if (!event.origin.includes(window.location.hostname)) {
    return
  }

  const { type, data } = event.data || {}
  
  switch (type) {
    case 'gameClose':
      // iframe 请求关闭游戏
      handleClose()
      break

    case 'gameError':
      // 游戏加载错误
      console.error('Game error:', data)
      handleClose()
      break

    case 'gameLoaded':
      // 游戏加载完成
      console.log('Game loaded successfully')
      emit('update:loading', false)
      break

    case 'gameAction':
      // 游戏内操作
      console.log('Game action:', data)
      break
  }
}

// 添加消息监听
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    window.addEventListener('message', handleMessage)
  } else {
    window.removeEventListener('message', handleMessage)
  }
}, { immediate: true })

const handleClose = () => {
  emit('close')
  emit('update:visible', false)
}

// 组件卸载时清理事件监听
import { onUnmounted } from 'vue'
onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})
</script>

<style scoped>
/* 游戏 iframe 覆盖层样式 */
.game-iframe-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.game-iframe-header {
  position: absolute;
  max-width: 448Px;
  top: 20px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  z-index: 10000;
}

.close-btn-back {
  background: url('/images/common/backIcon.png') no-repeat center center;
  background-size: 100% 100%;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn-back:hover {
  background-color: rgba(255, 255, 255, 0.7);
  transform: scale(1.05);
}

.game-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* 游戏加载状态样式 */
.game-loading-overlay {
  z-index: 10001;
}

.game-loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #ffd700;
  font-size: 16px;
}
</style>
