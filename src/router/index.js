import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import LocationView from "../views/location.vue"
import HomeView from '../views/home.vue' 
import login from '../views/login.vue' 
import fbLogin from '../components/fblogin.vue' 
import privacy from '../components/privacy.vue' 
import googlelogin from '../components/googlelogin.vue' 
import callbackGo from '../components/callback-go.vue' 
import Cookies from 'js-cookie';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView // 如果有首頁頁面
    },
    {
        path: '/location',
        name: 'location',
        component: LocationView,
        beforeEnter: (to, from, next) => {
            const isFbLogin = Cookies.get('fbStatus');
            const isGoogleLogin = Cookies.get('googleStatus');
            
            // 檢查是否已經登入 Google 和 Facebook
            if (!isFbLogin || !isGoogleLogin) {
              // 如果未登入，重定向到登入頁面
              next({ path: '/login' });
            } else {
              // 已登入，允許導航
              next();
            }
          },
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
