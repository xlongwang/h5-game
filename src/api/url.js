// 根据环境变量获取API基础URL
function getApiUrl() {
    const env = import.meta.env.VITE_APP_ENV || 'development'
    console.log('🚀 ~ getApiUrl ~ env:', env)

    const urlMap = {
        development: 'https://mineadmin.thebbxxzm.top',
        // test: 'https://mineadmin.thebbxxzm.top',
        test: 'https://www.slot777game.to',
        // production: 'https://mineadmin.thebbxxzm.top',
        production: 'https://www.slot777game.top',
    }

    return urlMap[env] || urlMap.development
}

const url = getApiUrl()
console.log('🚀 ~ url0000000000000099:', url)
export default url

// https://mineadmin.thebbxxzm.top/api/web/loginApi
