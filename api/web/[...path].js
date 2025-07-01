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

        const response = await axios({
            method: req.method,
            url: targetUrl,
            data: req.method === 'POST' ? qs.stringify(req.body) : undefined,
            params: req.method === 'GET' ? req.query : undefined,
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
            },
            timeout: 30000,
            maxRedirects: 5,
            validateStatus(status) {
                return status >= 200 && status < 600 // 接受所有状态码
            },
            // 使用更宽松的 SSL 配置
            httpsAgent: false, // 禁用默认 agent
            httpAgent: false, // 禁用默认 agent
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
