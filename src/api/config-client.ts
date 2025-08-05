/*
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-23 10:00:42
 * @FilePath: /vue3_app/src/api/config-client.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 添加客户端调试信息 - 只在浏览器环境中执行
if (typeof window !== 'undefined') {
    console.log('🚀 ~ 客户端API配置 ~ 当前域名:', window.location.origin)
    console.log('🚀 ~ 客户端API配置 ~ API路径:', '/api')
    console.log('🚀 ~ 客户端API配置 ~ 完整API地址:', `${window.location.origin}/api`)
}

const config = {
    // api: import.meta.env.DEV ? '/mock-api' : '/api',
    api: '/api',
    timeout: 30000,
}

export default config
