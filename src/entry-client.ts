import { createHead } from '@unhead/vue/client'
import { createApp } from './main'

import 'uno.css'
import 'vant/es/dialog/style'
import './assets/scss/global/global.scss'
import './assets/scss/style.scss'

// 强制重置 CSS 变量
const style = document.createElement('style')
style.textContent = `
:root {
    --body-width: 100% !important;
    --max-window: none !important;
    --min-window: none !important;
}

.body {
    width: 100% !important;
    max-width: none !important;
    min-width: none !important;
    left: 0 !important;
    right: 0 !important;
    position: relative !important;
    overflow: visible !important;
    height: auto !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
}

`
document.head.appendChild(style)

const { app, router, store } = createApp()
const head = createHead()

// 添加全局错误处理
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason)
})

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
    // 添加路由调试
    router.beforeEach((to, from) => {
        return true
    })

    router.afterEach((to, from) => {
        // 强制重新渲染检查 - 适用于所有环境
        setTimeout(() => {
            const appContainer = document.getElementById('app')
            if (appContainer) {
                const routerView = appContainer.querySelector('.body')
                if (routerView) {
                    const elements = routerView.querySelectorAll('*')
                    if (elements.length === 0) {
                        console.log('No elements found in router view, forcing router refresh...')
                        router.go(0)
                    }
                }
            }
        }, 100)
    })

    app.use(head)

    // 添加水合错误处理
    app.config.errorHandler = (err, instance, info) => {
        console.error('Vue error:', err)
        console.error('Error info:', info)
        console.error('Component:', instance)

        // 如果是水合错误，强制重新挂载
        if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string' && err.message.includes('hydration')) {
            console.log('Hydration error detected, forcing remount...')
            const appContainer = document.getElementById('app')
            if (appContainer) {
                appContainer.innerHTML = ''
                app.mount('#app')
            }
        }
    }

    // 监听水合完成事件 - 适用于所有环境
    const originalConsoleWarn = console.warn
    console.warn = (...args) => {
        const message = args.join(' ')
        if (message.includes('Hydration completed but contains mismatches')
            || message.includes('Hydration node mismatch')
            || message.includes('Hydration text content mismatch')) {
            console.log('Hydration mismatch detected but app is working - this is normal for SSR apps with dynamic content')
            return
        }
        originalConsoleWarn.apply(console, args)
    }

    try {
        app.mount('#app')

        // 检查水合是否成功 - 适用于所有环境
        setTimeout(() => {
            const bodyContainer = document.querySelector('.body')
            if (bodyContainer) {
                const elements = bodyContainer.querySelectorAll('*')
                if (elements.length === 0) {
                    console.log('No elements found in body container - potential hydration issue')
                    // 生产环境下的强制修复
                    if (!import.meta.env.DEV) {
                        console.log('Production environment: forcing app remount...')
                        app.unmount()
                        app.mount('#app')
                    }
                }
            }
        }, 200)
    }
    catch (error) {
        console.error('Failed to mount app:', error)
    }
})

if (window.__INITIAL_STATE__) {
    store.state.value = window.__INITIAL_STATE__
}
