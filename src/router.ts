import type { RouteRecordRaw } from 'vue-router'
import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

// Auto generates routes from vue files under ./views
// https://vitejs.dev/guide/features.html#glob-import
const views = import.meta.glob('./views/*.vue')

let routes: Array<RouteRecordRaw> = []
Object.keys(views).forEach((path: string) => {
    const math = path.match(/\.\/views(.*)\.vue$/)
    if (math) {
        const name = math[1].toLowerCase()
        if (name === '/home') {
            routes.push({
                name: 'home',
                path: '/',
                component: views[path],
            })
        } else {
            routes.push({
                name: name.replace('/', ''),
                path: name,
                component: views[path],
            })
        }
    }
})
routes = routes.concat([{ path: '/:pathMatch(.*)', redirect: '/' }])

export function createRouter() {
    return _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
    })
}
