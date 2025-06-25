/* eslint-disable node/prefer-global/process */
import type { RenderType } from '@/types'
import fs from 'node:fs'
import path from 'node:path'

import { fileURLToPath } from 'node:url'
import { UTC2Date } from '@lincy/utils'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import logger from 'morgan'
import requestIp from 'request-ip'
import serveStatic from 'serve-static'

export async function createServer() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const resolve = (p: string) => path.resolve(__dirname, p)

    // 添加调试信息
    console.log('Vercel environment:', !!process.env.VERCEL)
    console.log('Current directory:', __dirname)
    console.log('Process cwd:', process.cwd())

    // 适配 Vercel 环境的路径
    let clientPath: string | undefined
    let template: string
    let manifest: any

    if (process.env.VERCEL) {
        // Vercel 环境：尝试多个可能的路径
        const possiblePaths = [
            '/var/task/dist/client',
            '/var/task/client',
            resolve('../client'),
            resolve('client'),
        ]

        console.log('Trying possible client paths:', possiblePaths)

        for (const testPath of possiblePaths) {
            try {
                console.log('Testing path:', testPath)
                const indexPath = path.join(testPath, 'index.html')
                const manifestPath = path.join(testPath, '.vite/ssr-manifest.json')

                console.log('Checking files:', { indexPath, manifestPath })

                template = fs.readFileSync(indexPath, 'utf-8')
                manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

                clientPath = testPath
                console.log('Successfully found files at:', clientPath)
                break
            }
            catch (error: unknown) {
                const err = error as Error
                console.log('Failed to read from:', testPath, err.message)
                continue
            }
        }

        if (!clientPath) {
            throw new Error('Could not find client files in any of the expected locations')
        }
    }
    else {
        // 本地环境
        clientPath = resolve('client')
        template = fs.readFileSync(path.join(clientPath, 'index.html'), 'utf-8')
        manifest = JSON.parse(fs.readFileSync(path.join(clientPath, '.vite/ssr-manifest.json'), 'utf-8'))
    }

    const app = express()

    logger.token('remote-addr', (req) => {
        return requestIp.getClientIp(req) || 'unknown'
    })

    logger.token('date', () => {
        return UTC2Date(undefined, 'yyyy-mm-dd hh:ii:ss.SSS')
    })

    // Node.js 日志中间件
    app.use(
        logger('[:remote-addr] [:date] ":method :url" :status :res[content-length] ":referrer"', {
            skip(req) {
                const skipExt = ['.webmanifes', '.php', '.txt', '.map', '.js', '.css', '.png', 'jpg', '.jpeg', '.gif', '.ttf', '.woff2', '.ico']
                return skipExt.some((ext) => {
                    return req.url.includes(ext)
                })
            },
        }),
    )

    // Node.js 压缩中间件
    app.use(compression())

    // 在 Vercel 环境下跳过代理，因为 Vercel 不支持代理到外部服务
    if (!process.env.VERCEL) {
        // Node.js 代理中间件, 也可以在 nginx 直接配置, 那么将不会走这里的代理中间件
        app.use(
            createProxyMiddleware({
                target: 'http://php.mmxiaowu.com',
                changeOrigin: true,
                pathFilter: ['/api/**'],
                pathRewrite: {
                    '^/api': '/api',
                },
                on: {
                    proxyReq(proxyReq, req) {
                        proxyReq.setHeader('X-Real-IP', requestIp.getClientIp(req) || 'unknown')
                    },
                },
            }),
        )
    }

    // Node.js 静态资源中间件
    app.use(
        serveStatic(clientPath, {
            index: false,
        }),
    )

    // 解析 application/json 中间件
    app.use(express.json())
    // 解析 application/x-www-form-urlencoded 中间件
    app.use(express.urlencoded({ extended: true }))
    // 解析 cookies 中间件
    app.use(cookieParser())

    app.use('/{*default}', async (req, res) => {
        try {
            // const url = req.originalUrl.replace('/test/', '/')
            const url = req.originalUrl

            // 适配 Vercel 环境的路径
            const possibleServerPaths = process.env.VERCEL ? [
                '/var/task/dist/server/entry-server.js',
                '/var/task/server/entry-server.js',
                './server/entry-server.js',
            ] : ['./server/entry-server.js']

            let render: any
            for (const serverPath of possibleServerPaths) {
                try {
                    console.log('Trying server entry path:', serverPath)
                    render = (await import(serverPath)).render
                    console.log('Successfully loaded server entry from:', serverPath)
                    break
                }
                catch (error: unknown) {
                    const err = error as Error
                    console.log('Failed to load from:', serverPath, err.message)
                    continue
                }
            }

            if (!render) {
                throw new Error('Could not load server entry file')
            }

            const { html: appHtml, preloadLinks, headTags } = await render(url, manifest, req) as RenderType

            const html = template
                .replace('<!--preload-links-->', preloadLinks)
                .replace('<!--app-html-->', appHtml)
                .replace('<!--head-tags-->', headTags)

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        }
        catch (e: unknown) {
            const err = e as Error
            console.log('SSR render error:', err.stack)
            res.status(500).end(err.stack)
        }
    })

    return { app }
}

// 为 Vercel 导出 app 实例
let appInstance: express.Application | null = null

async function handler(req: any, res: any) {
    if (!appInstance) {
        const { app } = await createServer()
        appInstance = app
    }
    return appInstance(req, res)
}

// 本地开发时使用
if (!process.env.VERCEL) {
    const port = process.env.PORT || 7775
    createServer().then(({ app }) => app.listen(port, () => {
        console.log(`监听: http://localhost:${port}`)
    }))
}

export default handler
