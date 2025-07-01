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

        // 尝试使用 HTTP 而不是 HTTPS
        const targetUrl = `http://mineadmin.thebbxxzm.top/api/${apiPath}`

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
            },
            timeout: 30000,
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

        // 如果 HTTP 失败，尝试 HTTPS
        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            try {
                console.log('🌐 HTTP 失败，尝试 HTTPS...')

                const { path } = req.query
                const apiPath = Array.isArray(path) ? path.join('/') : path || ''
                const httpsUrl = `https://mineadmin.thebbxxzm.top/api/${apiPath}`

                // 创建自定义 HTTPS agent，使用最宽松的 SSL 配置
                const httpsAgent = new https.Agent({
                    rejectUnauthorized: false, // 忽略证书验证
                    secureProtocol: 'TLSv1_2_method', // 强制使用 TLS 1.2
                    ciphers: 'ALL', // 允许所有加密套件
                    minVersion: 'TLSv1', // 最低 TLS 版本
                    maxVersion: 'TLSv1.3', // 最高 TLS 版本
                    honorCipherOrder: false, // 不强制加密套件顺序
                    requestCert: false, // 不请求客户端证书
                    agent: false, // 禁用连接池
                })

                // 准备请求体
                let body
                if (req.method === 'POST' && req.body) {
                    body = qs.stringify(req.body)
                }

                // 准备查询参数
                let url = httpsUrl
                if (req.method === 'GET' && Object.keys(req.query).length > 0) {
                    const queryParams = new URLSearchParams()
                    for (const [key, value] of Object.entries(req.query)) {
                        if (key !== 'path') {
                            queryParams.append(key, value)
                        }
                    }
                    const queryString = queryParams.toString()
                    if (queryString) {
                        url += `?${queryString}`
                    }
                }

                const httpsResponse = await fetch(url, {
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
                    },
                    timeout: 30000,
                    agent: httpsAgent,
                    compress: true,
                    follow: 5,
                    size: 0,
                })

                console.log('🌐 HTTPS 代理响应状态:', httpsResponse.status)

                const httpsResponseText = await httpsResponse.text()
                let httpsResponseData
                try {
                    httpsResponseData = JSON.parse(httpsResponseText)
                }
                catch (e) {
                    httpsResponseData = httpsResponseText
                }

                console.log('🌐 HTTPS 代理响应数据:', httpsResponseData)

                res.status(httpsResponse.status).json(httpsResponseData)
                return
            }
            catch (httpsError) {
                console.error('🌐 HTTPS 也失败了:', httpsError.message)
            }
        }

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
