/*
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-04 10:31:29
 * @FilePath: /vue3_app/src/components/Bar.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-07-04 10:10:09
 * @FilePath: /vue3_app/src/components/Bar.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default defineComponent({
    name: 'CompHeader',
    props: {
        page: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        // 父子组件通讯 ===>
        const { page } = $(toRefs(props))
        // 父子组件通讯 <===
        return () => <div class="global-header">{page}</div>
    },
})
