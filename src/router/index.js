import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import LocationView from "../views/location.vue"
import HomeView from '../views/home.vue' // 假設你有一個 home.vue 文件

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView // 如果有首頁頁面
    },
    {
        path: '/location',
        name: 'location',
        component: LocationView
    },
    {
        path: '/:pathMatch(.*)*', // 捕捉所有未定義路徑，防止404
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
