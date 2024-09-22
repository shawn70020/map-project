// stores/useAppStore.js
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAppStore = defineStore('app', {
    state: () => ({
        fbUserData: null,      // Facebook 登入資訊
        googleUserData: null,  // Google 登入資訊
    }),
    actions: {
        setFbUserData(data) {
            this.fbUserData = data; // 設置 Facebook 用戶資料
            Cookies.set('fbData', JSON.stringify(data), { expires: 7 });
        },
        setGoogleUserData(data) {
            this.googleUserData = data; // 設置 Google 用戶資料
            Cookies.set('googleData', JSON.stringify(data), { expires: 7 });
        },
        restoreUserData() {
            // 從 Cookie 中獲取資料並設置到 state 中
            const fbData = Cookies.get('fbData');
            const googleData = Cookies.get('googleData');
            this.fbUserData = fbData ? JSON.parse(fbData) : null;
            this.googleUserData = googleData ? JSON.parse(googleData) : null;
        },
        clearUserData() {
            this.fbUserData = null;
            this.googleUserData = null;
        },
    },
    getters: {
        isGoogleLoggedIn(state) {
            return !!state.googleUserData?.name; // 返回 Google 登入狀態
        },
        isFacebookLoggedIn(state) {
            return !!state.fbUserData?.name; // 返回 Facebook 登入狀態
        },
    },
});
