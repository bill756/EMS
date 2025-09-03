import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('@/views/Navigation.vue'),
            children: [
                {path: '', redirect: '/home'}, // 默认重定向到home页面
                {path: 'home', component: () => import('@/views/Home/Home.vue')},
                {path: 'groupManager', component: () => import('@/views/group/GroupManager.vue')},
                {path: 'employeeManager', component: () => import('@/views/employee/EmployeeManager.vue')},
                {path: 'attendanceManager', component: () => import('@/views/attendance/AttendanceManager.vue')},
                {path: 'salaryManager', component: () => import('@/views/salary/SalaryManager.vue')},
                {path: 'assessmentManager', component: () => import('@/views/assessment/AssessmentManager.vue')},
                {path: 'groupShow', component: () => import('@/views/group/GroupShow.vue')},
                {path: 'employeeShow', component: () => import('@/views/employee/EmployeeShow.vue')},
                {path: 'attendanceShow', component: () => import('@/views/attendance/AttendanceShow.vue')},
                {path: 'salaryShow', component: () => import('@/views/salary/SalaryShow.vue')},
                {path: 'assessmentShow', component: () => import('@/views/assessment/AssessmentShow.vue')},

            ]
        },
        {path: '/test', component: () => import('@/views/test.vue')},
        {path: '/NotFound', component: () => import('@/views/404.vue')},
        {path: '/:pathMatch(.*)', redirect: '/NotFound'},
    ],
})

export default router
