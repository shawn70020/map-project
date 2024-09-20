<template>
  <div>
    <button id="google-login-btn">使用 Google 登入</button>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  setup() {
    const handleCredentialResponse = (response) => {
      // 將用戶重定向到重定向頁面並傳遞憑證
      window.location.href = `/callback-go?credential=${response.credential}`;
    };

    onMounted(() => {
      window.google.accounts.id.initialize({
        client_id: "1088364698806-q4g0mabjbm9vdctd5q786tkqp39c6r5r.apps.googleusercontent.com", // 替換為你的 Google Client ID
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large" } // 可選配置
      );

      window.google.accounts.id.prompt(); // 自動提示用戶登入
    });
  },
};
</script>

<style scoped>
/* 可以添加一些樣式 */
</style>
