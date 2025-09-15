# GameIframe 组件使用指南

## 概述

`GameIframe` 是一个可复用的游戏iframe组件，用于在应用中显示游戏内容。该组件支持全屏显示、加载状态、关闭按钮等功能。

## 组件特性

- 🎮 全屏游戏显示
- 🔄 加载状态管理
- ❌ 可配置关闭按钮
- 📱 响应式设计
- 🔒 安全的iframe消息处理
- 🎯 TypeScript支持

## 基本使用

### 1. 导入组件和composable

```vue
<script setup lang="ts">
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
</script>
```

### 2. 在模板中使用组件

```vue
<template>
    <div>
        <!-- 你的页面内容 -->
        <van-button @click="handleGameClick">开始游戏</van-button>

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
```

### 3. 处理游戏点击事件

```typescript
// 游戏数据接口
interface GameInfo {
    id: number
    name: string
    icon: string
    url?: string
}

// 处理游戏点击
async function handleGameClick(game: GameInfo) {
    await openGame(game)
}

// 处理游戏关闭
function handleGameClose() {
    console.log('游戏已关闭')
    closeGame()
}
```

## API 参考

### GameIframe Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `visible` | `boolean` | `false` | 是否显示游戏iframe |
| `gameUrl` | `string` | `''` | 游戏URL地址 |
| `loading` | `boolean` | `false` | 是否显示加载状态 |
| `showCloseBtn` | `boolean` | `true` | 是否显示关闭按钮 |

### GameIframe Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `close` | - | 游戏关闭时触发 |
| `update:visible` | `boolean` | 更新visible状态 |

### useGameIframe Composable

#### 状态

- `gameIframeVisible`: 游戏iframe是否可见
- `gameIframeUrl`: 游戏URL
- `gameLoading`: 游戏加载状态

#### 方法

- `openGame(game: GameInfo)`: 打开游戏
- `closeGame()`: 关闭游戏
- `setGameUrl(url: string)`: 直接设置游戏URL

## 使用场景

### 1. 在游戏列表页面使用

```vue
<template>
    <div class="game-list">
        <div
            v-for="game in games"
            :key="game.id"
            class="game-item"
            @click="handleGameClick(game)"
        >
            <img :src="game.icon" :alt="game.name">
            <span>{{ game.name }}</span>
        </div>

        <GameIframe
            v-model:visible="gameIframeVisible"
            :game-url="gameIframeUrl"
            :loading="gameLoading"
            @close="handleGameClose"
        />
    </div>
</template>
```

### 2. 在活动页面使用

```vue
<template>
    <div class="activity-page">
        <van-button
            type="primary"
            :loading="gameLoading"
            @click="openActivityGame"
        >
            参与活动游戏
        </van-button>

        <GameIframe
            v-model:visible="gameIframeVisible"
            :game-url="gameIframeUrl"
            :loading="gameLoading"
            :show-close-btn="false"
            @close="handleGameClose"
        />
    </div>
</template>
```

### 3. 测试环境使用

```typescript
// 直接设置测试URL
function openTestGame() {
    setGameUrl('https://test-game.example.com')
}
```

## 样式自定义

组件使用scoped样式，如需自定义样式，可以通过以下方式：

### 1. 覆盖CSS变量

```css
.game-iframe-overlay {
  background: rgba(0, 0, 0, 0.95); /* 自定义背景 */
}

.close-btn-back {
  width: 80px; /* 自定义关闭按钮大小 */
  height: 80px;
}
```

### 2. 使用深度选择器

```vue
<style scoped>
:deep(.game-iframe-overlay) {
  background: linear-gradient(45deg, #000, #333);
}
</style>
```

## 注意事项

1. **安全性**: 组件会自动验证iframe消息来源，确保安全性
2. **性能**: 组件使用Teleport渲染到body，避免样式冲突
3. **响应式**: 组件会自动适配不同屏幕尺寸
4. **内存管理**: 组件卸载时会自动清理事件监听器

## 故障排除

### 游戏无法加载
- 检查游戏URL是否正确
- 确认网络连接正常
- 查看控制台是否有错误信息

### 关闭按钮不显示
- 检查`showCloseBtn`属性是否为true
- 确认关闭按钮图片路径正确

### 样式问题
- 检查是否有CSS冲突
- 确认组件正确导入
- 查看浏览器开发者工具

## 更新日志

- v1.0.0: 初始版本，支持基本游戏iframe功能
- v1.1.0: 添加composable支持，优化状态管理
- v1.2.0: 添加TypeScript支持，改进类型安全
