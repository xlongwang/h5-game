/*
 * @Author: along longwang6@163.com
 * @Date: 2025-07-04 15:23:12
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-04 19:15:04
 * @FilePath: /vue3_app/src/i18n/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import es from './locales/es'
import ptBR from './locales/pt-BR'
import ptPT from './locales/pt-PT'

// 支持的语言列表
export const supportedLocales = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt-BR', name: 'Português (Brasil)', flag: '🇧🇷' },
    { code: 'pt-PT', name: 'Português (Portugal)', flag: '🇵🇹' },
]

// 获取默认语言
function getDefaultLocale(): string {
    // 检查是否在浏览器环境
    if (typeof window !== 'undefined') {
        // 优先从localStorage获取
        const savedLocale = localStorage.getItem('locale')
        if (savedLocale && supportedLocales.find(locale => locale.code === savedLocale)) {
            return savedLocale
        }

        // 从浏览器语言获取，支持完整语言代码（如 pt-BR, pt-PT）
        const browserLocale = navigator.language
        const exactMatch = supportedLocales.find(locale => locale.code === browserLocale)
        if (exactMatch) {
            return browserLocale
        }

        // 如果没有精确匹配，尝试匹配基础语言代码
        const baseLocale = browserLocale.split('-')[0]
        const baseMatch = supportedLocales.find(locale => locale.code === baseLocale)
        if (baseMatch) {
            return baseLocale
        }

        // 对于葡萄牙语的特殊处理
        if (baseLocale === 'pt') {
            // 根据地区信息判断是巴西还是葡萄牙
            const region = browserLocale.split('-')[1]?.toUpperCase()
            if (region === 'BR') {
                return 'pt-BR'
            }
            else if (region === 'PT') {
                return 'pt-PT'
            }
            else {
                // 默认使用巴西葡萄牙语（更常用）
                return 'pt-BR'
            }
        }
    }

    // 默认返回英语
    return 'en'
}

const i18n = createI18n({
    legacy: false, // 使用 Composition API
    locale: getDefaultLocale(),
    fallbackLocale: 'en',
    messages: {
        en,
        es,
        'pt-BR': ptBR,
        'pt-PT': ptPT,
    },
})

export default i18n
