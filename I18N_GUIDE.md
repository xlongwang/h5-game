# 多语言国际化指南

本项目已集成 `vue-i18n` 支持多语言国际化，支持以下语言：
- 🇺🇸 English (英语)
- 🇪🇸 Español (西班牙语)
- 🇵🇹 Português (葡萄牙语)
- 🇨🇳 中文 (简体中文)

## 快速开始

### 1. 在组件中使用多语言

```vue
<template>
    <div>
        <!-- 使用 t() 函数翻译文本 -->
        <h1>{{ t('common.loading') }}</h1>
        <p>{{ t('nav.casino') }}</p>

        <!-- 带参数的翻译 -->
        <p>{{ t('errors.minLength', { min: 6 }) }}</p>
    </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

const { i18n } = useGlobal()
const { t } = i18n
</script>
```

### 2. 语言切换

```vue
<template>
    <div>
        <!-- 使用语言切换器组件 -->
        <LanguageSwitcher />

        <!-- 或者手动切换 -->
        <button @click="changeLanguage('zh')">切换到中文</button>
    </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useGlobal } from '@/composables'

const { i18n } = useGlobal()
const { changeLanguage } = i18n
</script>
```

### 3. 格式化功能

```vue
<script setup lang="ts">
import { useGlobal } from '@/composables'

const { i18n } = useGlobal()
const { formatNumber, formatDate, formatCurrency } = i18n

// 数字格式化
const formattedNumber = formatNumber(1234.56) // 根据语言格式化

// 日期格式化
const formattedDate = formatDate(new Date()) // 根据语言格式化

// 货币格式化
const formattedCurrency = formatCurrency(1234.56, 'USD') // $1,234.56
</script>
```

## 语言包结构

语言包按功能模块组织：

```typescript
export default {
    // 通用文本
    common: {
        loading: 'Loading...',
        success: 'Success',
        error: 'Error',
    // ...
    },

    // 导航
    nav: {
        casino: 'Casino',
        promotion: 'Promotion',
        withdraw: 'Withdraw',
    // ...
    },

    // 认证相关
    auth: {
        login: 'Login',
        logout: 'Logout',
    // ...
    },

    // 用户信息
    user: {
        balance: 'Balance',
        points: 'Points',
    // ...
    },

    // 财务相关
    finance: {
        deposit: 'Deposit',
        withdraw: 'Withdraw',
    // ...
    },

    // 游戏相关
    game: {
        play: 'Play',
        bet: 'Bet',
    // ...
    },

    // 活动相关
    activity: {
        title: 'Activities',
        join: 'Join',
    // ...
    },

    // 客服支持
    support: {
        title: 'Customer Service',
        chat: 'Chat',
    // ...
    },

    // 设置
    settings: {
        title: 'Settings',
        language: 'Language',
    // ...
    },

    // 错误信息
    errors: {
        networkError: 'Network error, please try again',
    // ...
    }
}
```

## 添加新语言

### 1. 创建语言包文件

在 `src/i18n/locales/` 目录下创建新的语言文件，例如 `fr.ts`：

```typescript
export default {
    common: {
        loading: 'Chargement...',
        success: 'Succès',
        error: 'Erreur',
    // ...
    },
    // ... 其他模块
}
```

### 2. 更新配置

在 `src/i18n/index.ts` 中添加新语言：

```typescript
import fr from './locales/fr'

export const supportedLocales = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }, // 新增
]

const i18n = createI18n({
    // ...
    messages: {
        en,
        es,
        pt,
        fr, // 新增
    }
})
```

## 最佳实践

### 1. 使用嵌套键名

```typescript
// 好的做法
t('user.profile.balance')
t('game.slots.play')

// 避免过长的键名
t('user_profile_balance')
```

### 2. 使用参数化翻译

```typescript
// 语言包
{
  "errors.minLength": "Minimum length is {min} characters",
  "user.welcome": "Welcome, {name}!"
}

// 使用
t('errors.minLength', { min: 6 })
t('user.welcome', { name: 'John' })
```

### 3. 复数处理

```typescript
// 语言包
{
  "items": "no items | one item | {count} items"
}

// 使用
t('items', 0) // "no items"
t('items', 1) // "one item"
t('items', 5) // "5 items"
```

### 4. 日期和数字格式化

```typescript
// 使用内置的格式化函数
formatNumber(1234.56) // 根据语言格式化
formatDate(new Date()) // 根据语言格式化
formatCurrency(1234.56, 'USD') // 货币格式化
```

## 测试多语言

访问 `/languagetest` 路由可以查看多语言功能的完整演示。

## 注意事项

1. **语言持久化**: 用户选择的语言会保存在 `localStorage` 中
2. **默认语言**: 如果没有保存的语言设置，会使用浏览器语言，如果都不支持则默认使用英语
3. **SSR支持**: 多语言功能完全支持服务端渲染
4. **性能**: 语言包按需加载，不会影响应用性能

## 常见问题

### Q: 如何获取当前语言？
```typescript
const { i18n } = useGlobal()
const currentLocale = i18n.currentLocale.value
```

### Q: 如何监听语言变化？
```typescript
// 监听自定义事件
window.addEventListener('languageChanged', (event) => {
    const { locale } = event.detail
    console.log('Language changed to:', locale)
})
```

### Q: 如何添加新的翻译键？
在对应的语言包文件中添加新的键值对，然后在组件中使用 `t('new.key')` 即可。
