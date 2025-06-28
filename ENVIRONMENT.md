# 环境配置说明

本项目支持三种环境：开发环境(development)、测试环境(test)、生产环境(production)

## 环境变量文件

- `env.development` - 开发环境配置
- `env.test` - 测试环境配置  
- `env.production` - 生产环境配置

## 启动命令

### 开发环境
```bash
# 开发模式启动
npm run serve
# 或
pnpm serve
```

### 测试环境
```bash
# 测试模式启动
npm run serve:test
# 或
pnpm serve:test
```

### 生产环境
```bash
# 构建生产版本
npm run build
# 启动生产服务
npm run start
```

## 测试环境构建和启动
```bash
# 构建测试版本
npm run build:test
# 启动测试服务
npm run start:test
```

## 环境差异

| 环境 | 端口 | API地址 | Mock | 说明 |
|------|------|---------|------|------|
| development | 7775 | https://php.mmxiaowu.com | ✅ | 开发环境，支持热重载 |
| test | 7776 | https://test-api.mmxiaowu.com | ✅ | 测试环境，用于测试验证 |
| production | 7775 | https://php.mmxiaowu.com | ❌ | 生产环境，优化性能 |

## 环境变量

每个环境都有对应的环境变量：

- `NODE_ENV` - Node.js环境
- `VITE_APP_ENV` - 应用环境标识
- `VITE_APP_TITLE` - 应用标题
- `VITE_APP_API_BASE_URL` - API基础地址
- `VITE_APP_MOCK_ENABLED` - 是否启用Mock

## 使用示例

在代码中使用环境配置：

```typescript
import { getEnvConfig, isTest } from '@/utils/env'

const config = getEnvConfig()
console.log('当前API地址:', config.apiBaseUrl)

if (isTest()) {
    console.log('当前为测试环境')
}
``` 