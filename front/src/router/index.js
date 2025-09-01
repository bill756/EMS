import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/manager',
            component: () => import('@/views/Manager/Manager.vue'),
            children: [
                {path: '', redirect: '/manager/home'}, // 默认重定向到home页面
                {path: 'home', component: () => import('@/views/Manager/Home_Manager.vue')},
        
            ]
        },
        {path: '/test', component: () => import('@/views/Manager/test.vue')},
        {path: '/NotFound', component: () => import('../views/404/404.vue')},
        {path: '/:pathMatch(.*)', redirect: '/NotFound'},
        {path: '/', redirect: '/manager'}, // 根路径重定向到manager
    ],
})

export default router
