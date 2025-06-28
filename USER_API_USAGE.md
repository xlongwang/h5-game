# 用户信息API使用说明

## 概述

本项目已集成用户信息API服务，支持无感登录、获取用户详细信息、钱包信息等。

## API接口

### 用户无感登录
- **接口**: `POST /api/web/loginApi`
- **地址**: https://mineadmin.thebbxxzm.top/api/web/loginApi
- **参数**: `{ device_id: string }`
- **返回**: 认证信息，包括access_token、refresh_token等

### 获取用户信息
- **接口**: `POST /api/web/memberinfo`
- **地址**: https://mineadmin.thebbxxzm.top/api/web/memberinfo
- **返回**: 用户完整信息，包括钱包、交易记录等

## 文件结构

```
src/
├── api/
│   └── user-api.ts          # 用户API服务
├── stores/
│   └── use-user-store.ts    # 用户信息Store
├── components/
│   ├── UserInfo.vue         # 用户信息展示组件
│   └── LoginStatus.vue      # 登录状态组件
├── utils/
│   └── storage.ts           # 本地存储工具
└── types.ts                 # 类型定义
```

## 使用方法

### 1. 自动登录流程

```vue
<template>
  <div>
    <!-- 登录状态组件 -->
    <LoginStatus />
    
    <!-- 用户信息组件 -->
    <UserInfo v-if="userStore.isLoggedIn" />
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/composables'
import LoginStatus from '@/components/LoginStatus.vue'
import UserInfo from '@/components/UserInfo.vue'

const { userStore } = useGlobal()

// 应用启动时自动登录
onMounted(async () => {
  await userStore.autoLogin()
})
</script>
```

### 2. 手动登录

```typescript
import { useGlobal } from '@/composables'

const { userStore } = useGlobal()

// 手动触发登录
const handleLogin = async () => {
  try {
    await userStore.login()
    console.log('登录成功')
  } catch (error) {
    console.error('登录失败:', error)
  }
}
```

### 3. 在Store中使用

```typescript
import { useGlobal } from '@/composables'

const { userStore } = useGlobal()

// 自动登录（推荐）
await userStore.autoLogin()

// 手动登录
await userStore.login({ device_id: 'custom_device_id' })

// 获取用户信息
await userStore.fetchUserInfo()

// 登出
userStore.logout()

// 获取计算属性
const balance = userStore.getUserBalance
const bonus = userStore.getUserBonus
const isLoggedIn = userStore.isLoggedIn
const accessToken = userStore.getAccessToken
```

### 4. 直接调用API

```typescript
import { userApi } from '@/api/user-api'

// 登录
const loginResponse = await userApi.login({ device_id: 'device_123' })
if (loginResponse.code === 200) {
  console.log('登录成功:', loginResponse.data)
}

// 获取用户信息
const userResponse = await userApi.getMemberInfo()
if (userResponse.code === 200) {
  console.log('用户信息:', userResponse.data)
}
```

## 本地存储

系统会自动管理以下数据在localStorage中的存储：

- `auth_info` - 认证信息（token、过期时间等）
- `user_info` - 用户详细信息
- `device_id` - 设备ID

### 存储工具使用

```typescript
import { StorageUtil } from '@/utils/storage'

// 获取认证信息
const authInfo = StorageUtil.getAuthInfo()

// 获取访问令牌
const token = StorageUtil.getAccessToken()

// 获取设备ID
const deviceId = StorageUtil.getDeviceId()

// 生成新的设备ID
const newDeviceId = StorageUtil.generateDeviceId()

// 清除所有数据
StorageUtil.clearAllUserData()
```

## 数据格式

### 登录响应结构
```typescript
interface LoginResponse {
  code: number
  message: string
  data: {
    access_token: string      // 访问令牌
    refresh_token: string     // 刷新令牌
    expire_at: number         // 过期时间戳
    user: {
      id: number             // 用户ID
      user_name: string      // 用户名
    }
  }
}
```

### 认证信息结构
```typescript
interface AuthInfo {
  access_token: string
  refresh_token: string
  expire_at: number
  user: {
    id: number
    user_name: string
  }
}
```

### 用户信息结构
```typescript
interface UserInfo {
  id: number                    // 用户ID
  user_name: string            // 用户名
  status: number               // 状态 (1: 正常, 0: 禁用)
  receiving_account: string | null  // 收款账户
  pix_type: string | null      // PIX类型
  created_at: string           // 创建时间
  updated_at: string           // 更新时间
  device_id: string            // 设备ID
  wallet: Wallet               // 钱包信息
  wallet_logs: WalletLog[]     // 钱包记录
  referral: any | null         // 推荐人
  referred_by: any | null      // 被推荐人
}
```

## Store状态

```typescript
interface UserStore {
  userInfo: UserInfo | null    // 用户信息
  authInfo: AuthInfo | null    // 认证信息
  loading: boolean             // 加载状态
  error: string | null         // 错误信息
}
```

## 计算属性

- `getUserBalance` - 获取用户余额
- `getUserBonus` - 获取用户奖金
- `getUserTotalBet` - 获取用户总投注
- `getUserTotalCharge` - 获取用户总充值
- `isLoggedIn` - 检查用户是否已登录
- `getAccessToken` - 获取访问令牌
- `getDeviceId` - 获取设备ID

## 自动认证

系统会自动在API请求中添加认证头：

```typescript
// 自动添加 Authorization: Bearer {token}
axios.interceptors.request.use((config) => {
  const accessToken = StorageUtil.getAccessToken()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})
```

## 错误处理

API调用失败时会自动处理错误：

```typescript
try {
  await userStore.autoLogin()
} catch (error) {
  // 错误信息存储在 userStore.error 中
  console.error('错误:', userStore.error)
}
```

## 注意事项

1. **无感登录**: 系统会自动生成设备ID进行无感登录
2. **Token过期**: 系统会自动检查token是否过期，过期后会自动清除
3. **本地存储**: 所有认证和用户信息都会保存在localStorage中
4. **自动认证**: API请求会自动添加认证头
5. **错误处理**: 完善的错误处理和状态管理
6. **设备ID**: 首次访问会自动生成设备ID并保存

## 最佳实践

1. **应用启动时使用autoLogin()**: 自动处理登录流程
2. **检查isLoggedIn状态**: 根据登录状态显示不同内容
3. **使用计算属性**: 获取用户数据时使用计算属性
4. **错误处理**: 始终处理可能的错误情况
5. **登出清理**: 登出时会自动清理所有相关数据 