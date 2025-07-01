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

    // 返回测试信息
    res.status(200).json({
        message: 'API 路由测试成功',
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        query: req.query,
        body: req.body,
        headers: req.headers,
    })
}
