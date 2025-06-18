const vmDesignWidth = 375 // 设计稿宽度
const vmDesignHeight = 667 // 设计稿宽度
const vmMinWidth = 320 // 兼容最小宽度
const vmMaxWidth = 540 // 兼容最大宽度
const vmFontSize = 37.5 // 为什么设置 100? 设置成便于计算, 计算rem时只需要将 设计稿的宽度 / 100 即可

const vmMinWindow = `${vmMinWidth}Px` // 兼容最小宽度
const vmMaxWindow = `${vmMaxWidth}Px` // 兼容最大宽度
const vmDesignMultiple = vmDesignWidth / 750

export const designWidth = vmDesignWidth
export const designHeight = vmDesignHeight
export const designMultiple = vmDesignMultiple
export const minWidth = vmMinWidth
export const minWindow = vmMinWindow
export const maxWidth = vmMaxWidth
export const maxWindow = vmMaxWindow
export const fontSize = vmFontSize

export function charsetRemoval() {
    return {
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
            charset: (atRule: any) => {
                if (atRule.name === 'charset') {
                    atRule.remove()
                }
            },
        },
    }
}
