import { createI18n } from 'vue-i18n'
import en from './locales/en'
import ptBR from './locales/pt-BR'
import ptPT from './locales/pt-PT'
import sp from './locales/sp'

// 支持的语言列表
export const supportedLocales = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sp', name: 'Spanish', flag: '🇪🇸' },
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

        // 对于西班牙语的特殊处理
        if (baseLocale === 'es') {
            return 'sp'
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

    // 默认返回西班牙语
    return 'sp'
}

const i18n = createI18n({
    legacy: false, // 使用 Composition API
    locale: getDefaultLocale(),
    fallbackLocale: 'en',
    messages: {
        en,
        sp,
        'pt-BR': ptBR,
        'pt-PT': ptPT,
    },
})

export default i18n
