// eslint-disable-next-line antfu/no-import-dist
import handler from '../dist/server.js'

// Vercel serverless function handler
export default async function (req, res) {
    try {
        return await handler(req, res)
    }
    catch (error) {
        console.error('Server error:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
