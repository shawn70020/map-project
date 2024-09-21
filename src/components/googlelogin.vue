<template>
  <div>
    <button id="google-login-btn">使用 Google 登入</button>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { jwtDecode } from "jwt-decode"; // 用於解碼 ID token

export default {
  setup() {
    const handleCredentialResponse = (response) => {
      // 解碼 ID Token 來獲取用戶資料
      const decodedToken = jwtDecode(response.credential);
      console.log("用戶基本資料:", decodedToken);
      // 可以在這裡處理用戶的基本資料，例如展示或存儲
    };

    onMounted(() => {
      // 初始化 Google 登入 SDK
      window.google.accounts.id.initialize({
        client_id: "1088364698806-q4g0mabjbm9vdctd5q786tkqp39c6r5r.apps.googleusercontent.com", // 替換為你的 Google Client ID
        callback: handleCredentialResponse, // 每次成功登入或恢復會話時觸發
        auto_select: true, // 自動選擇已登入帳戶
      });

      // 渲染 Google 登入按鈕
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large" } // 可選配置
      );

      // 檢查是否已經登入過
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log("自動恢復會話，嘗試獲取用戶基本資料");
          // 如果會話已經恢復，`callback` 將會被自動觸發，並獲取用戶資料
        } else {
          console.log("顯示登入提示，等待用戶操作");
        }
      });
    });
  },
};
</script>

<style scoped>
/* 可以添加一些樣式 */
</style>
