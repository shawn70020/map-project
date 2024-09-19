import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import LocationView from "../views/location.vue"
import HomeView from '../views/home.vue' 
import fbLogin from '../components/fblogin.vue' 
import privacy from '../components/privacy.vue' 

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
        path: '/fblogin',
        name: 'fbLogin',
        component: fbLogin
    },
    {
        path: '/privacy',
        name: 'privacy',
        component: privacy
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
