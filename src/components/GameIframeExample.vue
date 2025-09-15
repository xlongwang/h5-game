<template>
  <div class="game-iframe-example">
    <h2>游戏iframe组件使用示例</h2>
    
    <div class="game-buttons">
      <van-button 
        type="primary" 
        @click="openTestGame"
        :loading="gameLoading"
      >
        打开测试游戏
      </van-button>
      
      <van-button 
        type="default" 
        @click="openCustomGame"
        :loading="gameLoading"
      >
        打开自定义游戏URL
      </van-button>
    </div>

    <!-- 游戏iframe组件 -->
    <GameIframe
      v-model:visible="gameIframeVisible"
      :game-url="gameIframeUrl"
      :loading="gameLoading"
      :show-close-btn="true"
      @close="handleGameClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useGameIframe } from '@/composables/useGameIframe'

// 使用游戏iframe composable
const { 
  gameIframeVisible, 
  gameIframeUrl, 
  gameLoading, 
  openGame, 
  closeGame, 
  setGameUrl 
} = useGameIframe()

// 模拟游戏数据
const testGame = {
  id: 1,
  name: 'test-game',
  icon: '/images/casino/game1.png'
}

// 打开测试游戏
const openTestGame = async () => {
  await openGame(testGame)
}

// 打开自定义游戏URL（用于测试）
const openCustomGame = () => {
  // 这里可以设置一个测试URL
  setGameUrl('https://example.com/game')
}

// 处理游戏关闭
const handleGameClose = () => {
  console.log('游戏已关闭')
  closeGame()
}
</script>

<style scoped>
.game-iframe-example {
  padding: 20px;
}

.game-buttons {
  display: flex;
  gap: 16px;
  margin: 20px 0;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}
</style>
