# Mock 切换指南

## 当前状态
项目已配置好mock数据，在开发环境下自动使用mock接口。

## 切换到真实API

### 1. 修改API基础路径配置
**文件**: `src/api/config-client.ts`

```typescript
const config = {
    // 开发环境使用mock，生产环境使用真实API
    api: import.meta.env.DEV ? '/mock-api' : '/api',
    // 改为始终使用真实API
    api: '/api',
    timeout: 30000,
}
```

### 2. 禁用Mock插件
**文件**: `vite.config.ts`

```typescript
viteMockServe({
    mockPath: 'mock',
    // 改为 false 禁用mock
    enable: false, // 原来是: command === 'serve'
    logger: true,
    watchFiles: true,
}),
```

### 3. 配置API代理（如果需要）
**文件**: `server.dev.ts`

确保代理配置正确：
```typescript
// 确保这个代理配置存在且正确
app.use('/api', proxy({
    target: 'https://your-real-api-domain.com',
    changeOrigin: true,
    // 其他代理配置...
}))
```

### 4. 重启开发服务器
```bash
npm run serve
```

## 快速切换脚本

可以创建两个脚本来快速切换：

### 启用Mock模式
```bash
# 修改 config-client.ts 中的 api 为 '/mock-api'
# 修改 vite.config.ts 中的 enable 为 command === 'serve'
npm run serve
```

### 启用真实API模式
```bash
# 修改 config-client.ts 中的 api 为 '/api'
# 修改 vite.config.ts 中的 enable 为 false
npm run serve
```

## 环境变量控制（推荐方案）

### 1. 添加环境变量
**文件**: `.env.development`
```
VITE_USE_MOCK=true
VITE_API_BASE_URL=/mock-api
```

**文件**: `.env.production`
```
VITE_USE_MOCK=false
VITE_API_BASE_URL=/api
```

### 2. 修改配置文件
**文件**: `src/api/config-client.ts`
```typescript
const config = {
    api: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 30000,
}
```

**文件**: `vite.config.ts`
```typescript
viteMockServe({
    mockPath: 'mock',
    enable: import.meta.env.VITE_USE_MOCK === 'true',
    logger: true,
    watchFiles: true,
}),
```

## 注意事项

1. **Mock数据清理**: 切换到真实API后，记得清理localStorage中的mock数据
2. **接口兼容性**: 确保真实API的接口格式与mock数据一致
3. **认证处理**: 真实API可能需要不同的认证方式
4. **错误处理**: 真实API的错误响应格式可能与mock不同

## 当前Mock接口列表

- `POST /mock-api/web/loginApi` - 用户登录
- `POST /mock-api/web/memberinfo` - 获取用户信息
- `GET /mock-api/test-mock` - 测试接口

## 调试技巧

1. **查看Mock日志**: 控制台会显示 `✅ Mock登录接口被调用` 等日志
2. **网络面板**: 检查请求是否被mock拦截
3. **Mock文件**: 修改 `mock/module-index.ts` 来调整mock数据 