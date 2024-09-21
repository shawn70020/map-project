<template>
  <div>
    <div id="google-login-btn" class="google-btn">
      <img src="../../public/img/google-logo.png" alt="google-btn" />使用 Google 登入
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { jwtDecode } from "jwt-decode"; // 用於解碼 ID token
import { useAppStore } from "../stores/index.js";
export default {
  setup() {
    const appStore = useAppStore();
    const userData = ref(null);

    const handleCredentialResponse = (response) => {
      // 解碼 ID Token 來獲取用戶資料
      const userObject = jwtDecode(response.credential);
      console.log("用戶基本資料:", userObject);

      userData.value = {
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture,
      };
      appStore.setGoogleUserData(userData.value);
      console.log(userData.value);
    };

    onMounted(() => {
      // 初始化 Google 登入 SDK
      window.google.accounts.id.initialize({
        client_id:
          "1088364698806-q4g0mabjbm9vdctd5q786tkqp39c6r5r.apps.googleusercontent.com", // 替換為你的 Google Client ID
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
/* 覆蓋 Google 按鈕的樣式 */
#google-login-btn-container {
  width: 350px; /* 自定義寬度 */
  height: 3rem; /* 自定義高度 */
}

#google-login-btn > div {
  width: 100% !important; /* 使按鈕寬度自適應容器 */
  height: 100% !important; /* 使按鈕高度自適應容器 */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
