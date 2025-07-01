/*
 * @Author: along longwang6@163.com
 * @Date: 2025-07-01 17:28:01
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-01 19:13:19
 * @FilePath: /vue3_app/src/config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 生成随机用户ID (4-10位)
function generateRandomId(): string {
    const minLength = 4
    const maxLength = 10
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength

    let id = ''
    for (let i = 0; i < length; i++) {
        id += Math.floor(Math.random() * 10)
    }
    return id
}

// 生成随机金额 (从指定值中选择)
function generateRandomAmount(): string {
    const amounts = [2, 200, 3000, 5000, 20000, 50000]
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)]
    return randomAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// 生成随机跑马灯文本
function generateMarqueeText(): string {
    const id = generateRandomId()
    const amount = generateRandomAmount()
    return `Felicidades ${id} Retirar $${amount}`
}

function generateMarqueeObj(): any {
    const id = generateRandomId()
    const amount = generateRandomAmount()
    return {
        id,
        amount,
        time: Math.ceil(Math.floor(Math.random() * 60)),
    }
}

// 首页跑马灯设置 - 每次调用生成新的随机数据
export function getMarqueeTexts(): string[] {
    const texts = []

    // 生成9个随机文本
    for (let i = 0; i < 9; i++) {
        texts.push(generateMarqueeText())
    }

    return texts
}

export function getMarqueeData(): any[] {
    const data = []
    for (let i = 0; i < 9; i++) {
        data.push(generateMarqueeObj())
    }
    return data
}
