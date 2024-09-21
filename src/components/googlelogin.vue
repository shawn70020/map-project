<template>
  <div>
    <button id="google-login-btn">使用 Google 登入</button>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { jwtDecode } from "jwt-decode"; 

export default {
  setup() {
    const handleCredentialResponse = (response) => {
      // 將用戶重定向到重定向頁面並傳遞憑證
      window.location.href = `/callback-go?credential=${response.credential}`;
    };

    const fetchUserInfo = (credential) => {
      // 解碼 ID Token 來獲取用戶資料
      const decodedToken = jwtDecode(credential);
      console.log("用戶基本資料:", decodedToken);
      // 可以在這裡處理用戶的基本資料，例如展示或存儲
    };

    onMounted(() => {
      // 初始化 Google 登入 SDK
      window.google.accounts.id.initialize({
        client_id: "1088364698806-q4g0mabjbm9vdctd5q786tkqp39c6r5r.apps.googleusercontent.com", // 替換為你的 Google Client ID
        callback: handleCredentialResponse,
        auto_select: true, // 自動選擇已登入帳戶
      });

      // 渲染 Google 登入按鈕
      window.google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        { theme: "outline", size: "large" }
      );

      // 檢查是否已經登入過
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log("自動恢復會話，嘗試獲取用戶基本資料");

          // 嘗試自動獲取用戶資料
          const storedCredential = window.google.accounts.id.get();
          if (storedCredential) {
            // 已有憑證，解碼並獲取用戶基本資料
            fetchUserInfo(storedCredential);
          } else {
            console.log("無可用的登入憑證");
          }
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
