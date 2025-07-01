import https from 'node:https'
import axios from 'axios'
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

        // 构建目标 URL
        const targetUrl = `https://mineadmin.thebbxxzm.top/api/${apiPath}`

        console.log('🌐 代理请求到:', targetUrl)
        console.log('🌐 请求方法:', req.method)
        console.log('🌐 请求数据:', req.body)
        console.log('🌐 请求头:', req.headers)

        // 创建自定义的 HTTPS agent 来处理 SSL 问题
        const httpsAgent = new https.Agent({
            rejectUnauthorized: false, // 忽略 SSL 证书验证
            secureProtocol: 'TLSv1_2_method', // 强制使用 TLS 1.2
            ciphers: 'ALL', // 允许所有加密套件
            minVersion: 'TLSv1.2',
            maxVersion: 'TLSv1.3',
        })

        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.method === 'POST' ? qs.stringify(req.body) : undefined,
            params: req.method === 'GET' ? req.query : undefined,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': req.headers['user-agent'],
                'Accept': req.headers.accept,
                'Accept-Language': req.headers['accept-language'],
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                ...req.headers,
            },
            timeout: 30000,
            httpsAgent,
            maxRedirects: 5,
            validateStatus(status) {
                return status >= 200 && status < 600 // 接受所有状态码
            },
        })

        console.log('🌐 代理响应:', {
            status: response.status,
            data: response.data,
        })

        // 返回响应
        res.status(response.status).json(response.data)
    }
    catch (error) {
        console.error('🌐 代理错误:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            code: error.code,
            errno: error.errno,
            syscall: error.syscall,
            hostname: error.hostname,
            port: error.port,
            path: error.path,
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
        else if (error.response) {
            res.status(error.response.status).json(error.response.data)
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
