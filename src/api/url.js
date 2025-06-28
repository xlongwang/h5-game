// 根据环境变量获取API基础URL
const getApiUrl = () => {
    const env = import.meta.env.VITE_APP_ENV || 'development'
    
    const urlMap = {
        development: 'https://mineadmin.thebbxxzm.top',
        test: 'https://mineadmin.thebbxxzm.top',
        production: 'https://mineadmin.thebbxxzm.top'
    }
    
    return urlMap[env] || urlMap.development
}

const url = getApiUrl()
export default url


// https://mineadmin.thebbxxzm.top/api/web/loginApi