export function getCoinNum(val: number) {
    return Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/**
 * 将驼峰命名转换为下划线命名
 * @param obj 需要转换的对象
 * @returns 转换后的对象
 */
export function camelToSnake(obj: any): any {
    if (obj === null || obj === undefined) {
        return obj
    }
    
    if (Array.isArray(obj)) {
        return obj.map(item => camelToSnake(item))
    }
    
    if (typeof obj === 'object') {
        const result: any = {}
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
                result[snakeKey] = camelToSnake(obj[key])
            }
        }
        return result
    }
    
    return obj
}
