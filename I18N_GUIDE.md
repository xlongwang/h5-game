# 多语言国际化指南

本项目已集成 `vue-i18n` 支持多语言国际化，支持以下语言：
- 🇺🇸 English (英语)
- ��🇸 Español (西班牙语)
- 🇧🇷 Português (Brasil) (巴西葡萄牙语)
- 🇵🇹 Português (Portugal) (葡萄牙葡萄牙语)

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

在个人资料页面 (`/perfil`) 中，点击"语言"选项可以切换应用语言：

```vue
<template>
    <div class="section02_item" @click="handleLanguageClick">
        <div class="section02_item_con">{{ t("profile.language") }}</div>
        <div class="section02_item_right_top">{{ getCurrentLanguageName() }}</div>
    </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'

const { i18n } = useGlobal()
const { t, getCurrentLanguageName, changeLanguage, currentLocale } = i18n

function handleLanguageClick() {
    pickerValue.value = currentLocale.value
    showPicker.value = true
}

function onConfirmPicker(value: any) {
    const selectedLocale = value[0]
    if (selectedLocale && selectedLocale !== currentLocale.value) {
        changeLanguage(selectedLocale)
    }
    showPicker.value = false
}
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
        cancel: 'Cancel',
        confirm: 'Confirm',
        // ...
    },

    // 导航
    nav: {
        casino: 'Casino',
        promotion: 'Promotion',
        withdraw: 'Withdraw',
        support: 'Support',
        profile: 'Profile',
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

    // 个人资料
    profile: {
        withdraw: 'Withdraw',
        deposit: 'Deposit',
        invite: 'Invite',
        language: 'Language',
        account: 'Account',
        about: 'About',
        monthlyMillion: 'Monthly Million',
    },

    // 组件相关
    components: {
        // 充值提现组件
        selectDepositAmount: 'Select deposit amount',
        extra: 'Extra',
        afterSuccessfulPayment: 'After a successful payment...',
        
        // 提现步骤组件
        linkWithdrawalAccount: 'Link Withdrawal Account',
        withdrawalAmount: 'Withdrawal Amount',
        name: 'Name',
        pleaseEnterName: 'Please enter your name',
        pixKey: 'PIX Key',
        phone: 'Phone',
        pleaseEnterPhone: 'Please enter your phone number',
        email: 'Email',
        pleaseEnterEmail: 'Please enter your email',
        cpf: 'CPF',
        pleaseEnterCPF: 'Please enter CPF number',
        cnjp: 'CNJP',
        pleaseEnterCNJP: 'Please enter CNJP number',
        pleaseSelectPixType: 'Please select PIX type',
        pleaseEnterAccountInfo: 'Please enter account information',
        invalidEmailFormat: 'Invalid email format',
        confirm: 'Confirm',
        
        // 提现弹窗组件
        details: 'Details',
        peopleInLine: 'Number of people in line',
        expectedTime: 'Expected time',
        useVIPWithdrawalChannel: 'Use VIP withdrawal channel',
        vipChannelDescription: 'Dear user, you have the opportunity...',
        depositButton: 'Deposit',
        withdrawalFee: 'Withdrawal Fee',
        payWithdrawalFee: 'Pay withdrawal fee',
        vipFeeDescription: 'Dear users: We are committed to...',
        orderDetails: 'Order Details',
        handlingFeeText: 'Handling Fee',
        personalTaxDescription: 'Dear user: This withdrawal belongs to...',
        personalIncomeTax: 'Personal Income Tax',
        payPersonalTax: 'Pay personal tax',
        success: 'Success',
        
        // 订单详情组件
        handlingFee: 'Handling Fee',
        payAccordingToOrder: 'Pay according to the order amount...',
        cancel: 'CANCEL',
        goToPay: 'GO TO PAY',
        orderNumber: 'Order Number',
        orderStatus: 'Order Status',
        paymentSuccess: 'Payment Success',
        paymentFailed: 'Payment Failed',
        paymentReturned: 'Payment Returned',
        paymentPending: 'Payment Pending',
        checkingPayment: 'Checking payment status',
        unknownStatus: 'Unknown Status',
        
        // 充值组件
        deposit: 'Deposit',
        receive: 'Receive',
        scanToPay: 'Scan to Pay',
        generatingQRCode: 'Generating QR Code...',
        scanQRCodeToPay: 'Please scan the QR code...',
        copyLink: 'Copy Link',
        close: 'Close',
        
        // 用户信息组件
        userInfo: 'User Information',
        normal: 'Normal',
        disabled: 'Disabled',
        username: 'Username',
        deviceId: 'Device ID',
        registrationTime: 'Registration Time',
        walletInfo: 'Wallet Information',
        balance: 'Balance',
        bonus: 'Bonus',
        totalBet: 'Total Bet',
        totalRecharge: 'Total Recharge',
        walletRecords: 'Wallet Records',
        recentRecords: 'Recent Records',
        noUserInfo: 'No user information',
        loading: 'Loading...',
    },

    // 错误信息
    errors: {
        networkError: 'Network error, please try again',
        serverError: 'Server error, please try again later',
        invalidInput: 'Invalid input',
        required: 'This field is required',
        minLength: 'Minimum length is {min} characters',
        maxLength: 'Maximum length is {max} characters',
        invalidFormat: 'Invalid format',
        notFound: 'Not found',
        unauthorized: 'Unauthorized',
        forbidden: 'Forbidden',
        timeout: 'Request timeout',
    },
}
```

## 主要页面和组件

### 1. 个人资料页面 (`/perfil`)
- 语言切换功能
- 用户信息显示
- 充值/提现入口

### 2. 充值组件 (`RechargPop.vue`)
- 选择充值金额
- 显示充值说明

### 3. 提现组件系列
- `RetairPop01.vue` - VIP通道选择
- `RetairPop02.vue` - VIP通道说明
- `RetairPop03.vue` - 提现费用说明
- `RetairPop04.vue` - 订单详情确认
- `RetairPop05.vue` - 个人所得税说明
- `RetairPop06.vue` - 最终确认支付

### 4. 提现步骤组件 (`RetarirStep2.vue`)
- 绑定提现账户
- PIX类型选择
- 表单验证

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
    { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
    { code: 'pt-PT', name: 'Português (Portugal)', flag: '🇵🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }, // 新增
]

const i18n = createI18n({
    // ...
    messages: {
        en,
        es,
        'pt-BR': ptBR,
        'pt-PT': ptPT,
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
5. **组件更新**: 所有组件中的硬编码文字都已替换为多语言配置

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

### Q: 如何确保所有组件都支持多语言？
1. 检查组件中是否有硬编码的文字
2. 在语言包中添加对应的翻译键
3. 使用 `t('key')` 替换硬编码文字
4. 测试不同语言环境下的显示效果
