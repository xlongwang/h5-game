import type { UserConfig } from 'vite'
import path from 'node:path'

import { fileURLToPath } from 'node:url'
// import apiDomain from './src/api/url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 根据环境获取API域名
const getApiDomain = () => {
    const env = process.env.VITE_APP_ENV || 'development'
    console.log("🚀 ~ getApiDomain ~ env 9999999:", env)
    console.log("🚀 ~ process.env.VITE_APP_ENV ~ env 4444444:", process.env.VITE_APP_ENV)
    
    const domainMap: Record<string, string> = {
        development: 'https://mineadmin.thebbxxzm.top',
        test: 'https://mineadmin.thebbxxzm.top',
        production: 'https://mineadmin.thebbxxzm.top'
    }
    
    return domainMap[env] || domainMap.development
}

const config: UserConfig = {
    build: {
        target: 'es2018',
        cssTarget: 'chrome79',
        minify: true,
        assetsInlineLimit: 4096,
        chunkSizeWarningLimit: 1000,
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
            },
            output: {
                manualChunks(id: string) {
                    // 处理css分块
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                    if (id.includes('__uno.css')) {
                        return 'unocss'
                    }
                },
            },
            external: /\.\/static.*/,
        },
    },
    server: {
        port: process.env.VITE_APP_ENV === 'test' ? 7776 : 7775,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: getApiDomain(),
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
                configure: (proxy, _options) => {
                    proxy.on('proxyReq', (proxyReq, req, _res) => {
                        proxyReq.setHeader('X-Real-IP', req.socket.remoteAddress || 'unknown')
                        if (process.env.VITE_APP_ENV === 'test') {
                            proxyReq.setHeader('X-Environment', 'test')
                        }
                    })
                },
            },
        },
    },
}

export default config
