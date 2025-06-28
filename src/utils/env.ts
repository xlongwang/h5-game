// 环境配置工具
export const getEnvConfig = () => {
    const env = import.meta.env.VITE_APP_ENV || 'development'
    
    const config = {
        development: {
            apiBaseUrl: 'https://php.mmxiaowu.com',
            mockEnabled: true,
            title: 'Vue3 SSR App (Dev)',
            port: 7775
        },
        test: {
            apiBaseUrl: 'https://test-api.mmxiaowu.com',
            mockEnabled: true,
            title: 'Vue3 SSR App (Test)',
            port: 7776
        },
        production: {
            apiBaseUrl: 'https://php.mmxiaowu.com',
            mockEnabled: false,
            title: 'Vue3 SSR App',
            port: 7775
        }
    }
    
    return config[env as keyof typeof config] || config.development
}

export const isDev = () => import.meta.env.VITE_APP_ENV === 'development'
export const isTest = () => import.meta.env.VITE_APP_ENV === 'test'
export const isProd = () => import.meta.env.VITE_APP_ENV === 'production' 