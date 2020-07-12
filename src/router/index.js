import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: '首页',
            component: () => import('@/components/page/index'),
        },
        {
            path: '/list',
            name: '列表',
            component: () => import('@/components/page/list'),
        },
        {
            path: '*',
            name: 'error',
            component: () => import('@/components/page/error')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})

// 解决重复route控制台报错的问题
const oripush = Router.prototype.push
Router.prototype.push = function push(location) {
    return oripush.call(this, location).catch(err => err)
}
