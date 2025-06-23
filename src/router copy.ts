/*
 * @Author: along longwang6@163.com
 * @Date: 2025-06-22 10:53:10
 * @LastEditors: along longwang6@163.com
 * @LastEditTime: 2025-06-23 10:41:21
 * @FilePath: /vue3_app/src/router.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { RouteRecordRaw } from 'vue-router'
import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import About from './views/About.vue'
import Apoyo from './views/Apoyo.vue'
import Casino from './views/Casino.vue'
import Home from './views/Home.vue'
import Perfil from './views/Perfil.vue'
import Promotion from './views/Promotion.vue'
import Retirar from './views/Retirar.vue'
import Topic from './views/Topic.vue'

const routes: Array<RouteRecordRaw> = [
    { name: 'casino', path: '/', component: Casino },
    { name: 'home', path: '/home', component: Home },
    { name: 'promotion', path: '/promotion', component: Promotion },
    { name: 'retirar', path: '/retirar', component: Retirar },
    { name: 'apoyo', path: '/apoyo', component: Apoyo },
    { name: 'perfil', path: '/perfil', component: Perfil },
    { name: 'about', path: '/about', component: About },
    { name: 'topic', path: '/topic', component: Topic },
    { path: '/:pathMatch(.*)', redirect: '/' },
]

export function createRouter() {
    const router = _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
    })

    return router
}
