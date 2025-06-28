/*
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-23 10:00:42
 * @FilePath: /vue3_app/src/api/config-client.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const config = {
    api: import.meta.env.DEV ? '/mock-api' : '/api',
    timeout: 30000,
}

export default config
