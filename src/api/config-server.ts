import { LRUCache } from 'lru-cache'

import apiDomain from './url.js'

const cached = false

// 添加服务器端调试信息
console.log('🚀 ~ 服务器端API配置 ~ apiDomain:', apiDomain)
console.log('🚀 ~ 服务器端API配置 ~ 完整API地址:', `${apiDomain}/api/`)

const config = {
    api: `${apiDomain}/api/`,
    port: 8080,
    timeout: 30000,
    cached: (cached
        && new LRUCache({
            max: 1000,
        })) as any,
    cachedItem: {},
}

export default config
