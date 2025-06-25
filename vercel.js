// eslint-disable-next-line antfu/no-import-dist
import { createServer } from './dist/server.js'

// Vercel 需要导出 app 实例
export default async function handler(req, res) {
    const { app } = await createServer()
    return app(req, res)
}
