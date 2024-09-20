<template>
  <div>
    <h1>登入成功</h1>
    <div v-if="userData">
      <p>用戶姓名: {{ userData.name }}</p>
      <p>用戶 Email: {{ userData.email }}</p>
      <img :src="userData.picture" alt="Google 頭像" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import { useAppStore } from "../stores/index.js";
export default {
  setup() {
    const appStore = useAppStore();
    const userData = ref(null);

    onMounted(() => {
      const params = new URLSearchParams(window.location.search);
      const credential = params.get("credential"); // 獲取重定向中返回的憑證

      if (credential) {
        try {
          const userObject = jwtDecode(credential); // 使用 jwt_decode 函數解碼憑證
          userData.value = {
            name: userObject.name,
            email: userObject.email,
            picture: userObject.picture,
          };
          useAppStore.setGoogleUserData(userData.value);
        } catch (error) {
          console.error("解碼憑證時發生錯誤", error);
        }
      } else {
        console.error("未獲取到憑證");
      }
    });

    return {
      userData,
    };
  },
};
</script>

<style scoped>
/* 可以添加一些樣式 */
</style>
