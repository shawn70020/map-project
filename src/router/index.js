import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import LocationView from "../views/location.vue"
import HomeView from '../views/home.vue' 
import login from '../views/login.vue' 
import fbLogin from '../components/fblogin.vue' 
import privacy from '../components/privacy.vue' 
import googlelogin from '../components/googlelogin.vue' 
import callbackGo from '../components/callback-go.vue' 

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
        path: '/login',
        name: 'login',
        component: login
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
        path: '/googlelogin',
        name: 'googlelogin',
        component: googlelogin
    },
    {
        path: '/callback-go',
        name: 'callbackGo',
        component: callbackGo
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
