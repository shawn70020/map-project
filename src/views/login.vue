<template>
  <div class='container'>
    <h2>請確保登入google且綁定facebook</h2>
    <!-- 登入選項 -->
    <div>
      <GoogleLogin class="mb-1" v-if="!isGoogleLoggedIn" />
      <FacebookLogin v-if="!isFacebookLoggedIn" />
    </div>
    <div v-if="isGoogleLoggedIn || isFacebookLoggedIn">
      <div v-if="!isFacebookLoggedIn">
        <p>您還需要使用 Facebook 登入以完成設置。</p>
      </div>

      <div v-if="!isGoogleLoggedIn">
        <p>您還需要使用 Google 登入以完成設置。</p>
      </div>
    </div>

    <div v-if="isGoogleLoggedIn && isFacebookLoggedIn">
      <p>您已經成功登入 Google 和 Facebook!</p>
      <button><router-link to="/location">繼續</router-link></button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import GoogleLogin from "../components/googlelogin.vue"; // 引入google組件
import FacebookLogin from "../components/fblogin.vue"; // 引入臉書組件
import { useAppStore } from "../stores/index.js"; // 引入 Pinia store
import { useRouter } from "vue-router";

export default {
  components: { GoogleLogin, FacebookLogin },
  setup() {
    const appStore = useAppStore();
    const router = useRouter();
    // 使用 computed 來自動響應 Pinia store 中的狀態變化
    const isGoogleLoggedIn = computed(() => appStore.isGoogleLoggedIn);
    const isFacebookLoggedIn = computed(() => appStore.isFacebookLoggedIn);

    const googleData = computed(() => appStore.googleUserData);
    const fbData = computed(() => appStore.fbUserData);

    return {
      isGoogleLoggedIn, // 使用 getter 獲取 Google 登入狀態
      isFacebookLoggedIn, // 使用 getter 獲取 Facebook 登入狀態
      googleData,
      fbData,
    };
  },
};
</script>

<style scoped>
.container{
    display:flex;
    flex-direction: column;
      align-items: center;
}
.mb-1{
    margin-bottom:1rem;
}
</style>
