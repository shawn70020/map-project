// stores/useAppStore.js
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAppStore = defineStore('app', {
    state: () => ({
        fbUserData: null,      // Facebook 登入資訊
        googleUserData: null,  // Google 登入資訊
        searchQuery: '',       // 查詢地址
        searchCoordinates: {    // 查詢經緯度
            latitude: null,
            longitude: null,
        },
    }),
    actions: {
        setFbUserData(data) {
            this.fbUserData = data; // 設置 Facebook 用戶資料
            Cookies.set('fbStatus', data, { expires: 7 });
        },
        setGoogleUserData(data) {
            this.googleUserData = data; // 設置 Google 用戶資料
            Cookies.set('googleStatus', data, { expires: 7 });
        },
        restoreUserData() {
            // 從 Cookie 中獲取資料並設置到 state 中
            const fbData = Cookies.get('fbStatus');
            const googleData = Cookies.get('googleStatus');
            this.fbUserData = fbData ? JSON.parse(fbData) : null;
            this.googleUserData = googleData ? JSON.parse(googleData) : null;
        },
        setSearchQuery(query) {
            this.searchQuery = query; // 設置查詢地址
        },
        setSearchCoordinates(lat, lng) {
            this.searchCoordinates.latitude = lat; // 設置經度
            this.searchCoordinates.longitude = lng; // 設置緯度
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
