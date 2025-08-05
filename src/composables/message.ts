import { showFailToast, showSuccessToast, showToast } from 'vant'

type MessageType = 'success' | 'info' | 'error'
type ConfigType = string | { content: string, type: MessageType }

const types = {
    info: showToast,
    success: showSuccessToast,
    error: showFailToast,
}

/**
 * 显式提示信息
 * @example
 * ```
 * showMsg('content')
 * showMsg({ content: 'content'; type: 'success' | 'warning' | 'info' | 'error' })
 * ```
 */
export function showMsg(config: ConfigType) {
    // 只在浏览器环境中执行
    if (typeof window === 'undefined') {
        return
    }
    
    let content, type: MessageType
    if (!config) {
        content = '接口返回数据错误'
        type = 'error'
    }
    else if (typeof config === 'string') {
        content = config
        type = 'error'
    }
    else {
        content = config.content
        type = config.type
    }
    types[type](content)
}
export function loginMsgBox(content: string, pathname: string) {
    if (typeof window !== 'undefined') {
        showDialog({
            message: content,
        }).then(() => {
            window.$$lock = false
            window.location.href = `/login?callback=${pathname}`
        }).catch(() => {
        })
    }
}
