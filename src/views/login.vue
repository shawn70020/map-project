<template>
  <div>
    <h1>使用者登入</h1>

    <div v-if="isGoogleLoggedIn || isFacebookLoggedIn">

      <div v-if="!isFacebookLoggedIn">
        <p>您還需要使用 Facebook 登入以完成設置。</p>
      </div>

      <div v-if="!isGoogleLoggedIn">
        <p>您還需要使用 Google 登入以完成設置。</p>
      </div>

      <div v-if="isGoogleLoggedIn && isFacebookLoggedIn">
        <p>您已經成功登入 Google 和 Facebook!</p>
      </div>
    </div>

    <!-- 登入選項 -->
    <div v-else>
      <GoogleLogin />
      <FacebookLogin />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import GoogleLogin from "../components/googlelogin.vue"; // 引入google組件
import FacebookLogin from "../components/fblogin.vue"; // 引入臉書組件

import { useAppStore } from "../stores/index.js";

export default {
  components: { GoogleLogin, FacebookLogin },
  setup() {
    const appStore = useAppStore();
    const userData = ref(null);
    const isGoogleLoggedIn = ref(false);
    const isFacebookLoggedIn = ref(false);

    return {
      isGoogleLoggedIn: appStore.isGoogleLoggedIn, // 使用 getter 獲取 Google 登入狀態
      isFacebookLoggedIn: appStore.isFacebookLoggedIn, // 使用 getter 獲取 Facebook 登入狀態
    };
  },
};
</script>

<style scoped>
/* 可以添加一些樣式 */
</style>
