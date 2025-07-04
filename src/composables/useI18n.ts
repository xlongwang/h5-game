import { computed, ref } from 'vue'
import { useI18n as useVueI18n } from 'vue-i18n'
import { supportedLocales } from '@/i18n'

export function useI18n() {
    const { t, locale, availableLocales } = useVueI18n()

    // 当前语言
    const currentLocale = computed(() => locale.value)

    // 支持的语言列表
    const locales = ref(supportedLocales)

    /**
     * 切换语言
     * @param langCode 语言代码
     */
    function changeLanguage(langCode: string) {
        if (availableLocales.includes(langCode)) {
            locale.value = langCode

            // 检查是否在浏览器环境
            if (typeof window !== 'undefined') {
                localStorage.setItem('locale', langCode)

                // 更新文档标题和HTML lang属性
                document.documentElement.lang = langCode

                // 触发自定义事件，通知其他组件语言已改变
                window.dispatchEvent(new CustomEvent('languageChanged', {
                    detail: { locale: langCode },
                }))
            }
        }
    }

    /**
     * 获取当前语言的显示名称
     */
    function getCurrentLanguageName(): string {
        const current = locales.value.find(locale => locale.code === currentLocale.value)
        return current?.name || 'English'
    }

    /**
     * 获取当前语言的国旗emoji
     */
    function getCurrentLanguageFlag(): string {
        const current = locales.value.find(locale => locale.code === currentLocale.value)
        return current?.flag || '🇺🇸'
    }

    /**
     * 检测用户浏览器语言并返回最匹配的语言代码
     */
    function detectUserLanguage(): string {
        if (typeof window === 'undefined')
            return 'en'

        const browserLanguages = navigator.languages || [navigator.language]

        for (const browserLang of browserLanguages) {
            // 精确匹配
            const exactMatch = supportedLocales.find(locale => locale.code === browserLang)
            if (exactMatch)
                return browserLang

            // 基础语言匹配
            const baseLang = browserLang.split('-')[0]
            const baseMatch = supportedLocales.find(locale => locale.code === baseLang)
            if (baseMatch)
                return baseLang

            // 葡萄牙语特殊处理
            if (baseLang === 'pt') {
                const region = browserLang.split('-')[1]?.toUpperCase()
                if (region === 'BR')
                    return 'pt-BR'
                if (region === 'PT')
                    return 'pt-PT'
                return 'pt-BR' // 默认巴西葡萄牙语
            }
        }

        return 'en'
    }

    /**
     * 获取语言信息
     * @param langCode 语言代码
     */
    function getLanguageInfo(langCode: string) {
        return locales.value.find(locale => locale.code === langCode)
    }

    /**
     * 检查是否为葡萄牙语变体
     */
    function isPortugueseVariant(langCode: string): boolean {
        return langCode === 'pt-BR' || langCode === 'pt-PT'
    }

    /**
     * 获取葡萄牙语变体名称
     */
    function getPortugueseVariantName(langCode: string): string {
        if (langCode === 'pt-BR')
            return 'Brasil'
        if (langCode === 'pt-PT')
            return 'Portugal'
        return ''
    }

    /**
     * 格式化数字
     * @param value 数值
     * @param options 格式化选项
     */
    function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
        return new Intl.NumberFormat(currentLocale.value, options).format(value)
    }

    /**
     * 格式化日期
     * @param date 日期
     * @param options 格式化选项
     */
    function formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
        const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
        return new Intl.DateTimeFormat(currentLocale.value, options).format(dateObj)
    }

    /**
     * 格式化货币
     * @param value 金额
     * @param currency 货币代码
     * @param options 格式化选项
     */
    function formatCurrency(value: number, currency = 'USD', options?: Intl.NumberFormatOptions): string {
        return new Intl.NumberFormat(currentLocale.value, {
            style: 'currency',
            currency,
            ...options,
        }).format(value)
    }

    /**
     * 格式化相对时间
     * @param date 日期
     */
    function formatRelativeTime(date: Date | string | number): string {
        const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

        const rtf = new Intl.RelativeTimeFormat(currentLocale.value, { numeric: 'auto' })

        if (diffInSeconds < 60)
            return rtf.format(-diffInSeconds, 'second')
        if (diffInSeconds < 3600)
            return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
        if (diffInSeconds < 86400)
            return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
        if (diffInSeconds < 2592000)
            return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
        if (diffInSeconds < 31536000)
            return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
        return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
    }

    return {
        t,
        currentLocale,
        locales,
        changeLanguage,
        getCurrentLanguageName,
        getCurrentLanguageFlag,
        detectUserLanguage,
        getLanguageInfo,
        isPortugueseVariant,
        getPortugueseVariantName,
        formatNumber,
        formatDate,
        formatCurrency,
        formatRelativeTime,
    }
}
