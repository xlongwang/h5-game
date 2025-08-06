// 根据环境变量获取API基础URL
function getApiUrl() {
    // 在 Vercel 环境中强制使用 production 域名
    const isVercel = !!import.meta.env.VITE_VERCEL || import.meta.env.VITE_APP_ENV === 'production'
    const env = isVercel ? 'production' : (import.meta.env.VITE_APP_ENV || 'development')

    const urlMap = {
        development: 'https://mineadmin.thebbxxzm.top',
        test: 'https://www.slot777game.to',
        production: 'https://www.slot777game.top',
    }

    return urlMap[env] || urlMap.development
}

const url = getApiUrl()
export default url

// https://mineadmin.thebbxxzm.top/api/web/loginApi
