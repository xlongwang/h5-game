/* eslint-disable node/prefer-global/process */
import https from 'node:https'
import fetch from 'node-fetch'
import qs from 'qs'

export default async function handler(req, res) {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    try {
        // 获取请求路径
        const { path } = req.query
        const apiPath = Array.isArray(path) ? path.join('/') : path || ''

        // 根据环境变量获取API基础URL
        function getApiUrl() {
            // 在 Vercel 环境中强制使用 production 域名
            const isVercel = !!process.env.VERCEL
            const env = isVercel ? 'production' : (process.env.VITE_APP_ENV || process.env.NODE_ENV || 'development')

            console.log('🚀 ~ Vercel API ~ 环境变量:', {
                VITE_APP_ENV: process.env.VITE_APP_ENV,
                NODE_ENV: process.env.NODE_ENV,
                VERCEL: process.env.VERCEL,
                isVercel,
                env,
            })

            const urlMap = {
                development: 'https://mineadmin.thebbxxzm.top',
                test: 'https://www.slot777game.to',
                production: 'https://www.slot777game.top',
            }

            return urlMap[env] || urlMap.development
        }

        const apiDomain = getApiUrl()
        console.log('🚀 ~ Vercel API ~ 使用的域名:', apiDomain)

        // 调试信息
        console.log('🌐 原始请求 URL:', req.url)
        console.log('🌐 请求路径参数:', req.query.path)
        console.log('🌐 解析后的 API 路径:', apiPath)

        // 使用动态域名
        const targetUrl = `${apiDomain}/api/${apiPath}`

        console.log('🌐 代理请求到:', targetUrl)
        console.log('🌐 请求方法:', req.method)
        console.log('🌐 请求数据:', req.body)

        // 准备请求体
        let body
        if (req.method === 'POST' && req.body) {
            body = qs.stringify(req.body)
        }

        // 准备查询参数
        let url = targetUrl
        if (req.method === 'GET' && Object.keys(req.query).length > 0) {
            const queryParams = new URLSearchParams()
            for (const [key, value] of Object.entries(req.query)) {
                if (key !== 'path') { // 排除路径参数
                    queryParams.append(key, value)
                }
            }
            const queryString = queryParams.toString()
            if (queryString) {
                url += `?${queryString}`
            }
        }

        // 创建自定义 HTTPS agent，兼容 TLS 1.2
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false,
            minVersion: 'TLSv1.2',
        })

        const response = await fetch(url, {
            method: req.method,
            body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'zh-CN,zh;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                ...(req.headers.authorization ? { authorization: req.headers.authorization } : {}),
            },
            timeout: 30000,
            agent: httpsAgent,
            // 额外的 fetch 选项
            compress: true,
            follow: 5, // 最大重定向次数
            size: 0, // 不限制响应大小
        })

        console.log('🌐 代理响应状态:', response.status)

        // 获取响应数据
        const responseText = await response.text()
        let responseData
        try {
            responseData = JSON.parse(responseText)
        }
        catch (e) {
            responseData = responseText
        }

        console.log('🌐 代理响应数据:', responseData)

        // 返回响应
        res.status(response.status).json(responseData)
    }
    catch (error) {
        console.error('🌐 代理错误:', {
            message: error.message,
            code: error.code,
            errno: error.errno,
            syscall: error.syscall,
            hostname: error.hostname,
            port: error.port,
            path: error.path,
            stack: error.stack,
        })

        // 更详细的错误处理
        if (error.code === 'ECONNRESET' || error.code === 'EPROTO' || error.code === 'ENOTFOUND') {
            res.status(500).json({
                code: -500,
                message: '网络连接失败',
                error: error.message,
                details: {
                    code: error.code,
                    hostname: error.hostname,
                    port: error.port,
                },
            })
        }
        else {
            res.status(500).json({
                code: -500,
                message: '代理请求失败',
                error: error.message,
                details: {
                    code: error.code,
                    errno: error.errno,
                    syscall: error.syscall,
                },
            })
        }
    }
}
