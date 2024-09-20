// stores/useAppStore.js
import { defineStore } from 'pinia';

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
    },
    setGoogleUserData(data) {
      this.googleUserData = data; // 設置 Google 用戶資料
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
