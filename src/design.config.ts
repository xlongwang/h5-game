/*
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-22 11:29:05
 * @FilePath: /vue3_app/src/design.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const vmDesignWidth = 1080 // 设计稿宽度
const vmDesignHeight = 1920 // 设计稿宽度
const vmMinWidth = 320 // 兼容最小宽度
const vmMaxWidth = 1080 // 兼容最大宽度
const vmFontSize = 72 // 为什么设置 100? 设置成便于计算, 计算rem时只需要将 设计稿的宽度 / 100 即可

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
