<template>
  <div>
    <button @click="loginWithFacebook">Facebook 登入</button>
    <div v-if="userData">
      <p>用戶姓名: {{ userData.name }}</p>
      <p>用戶 Email: {{ userData.email }}</p>
      <img :src="userData.picture" alt="Facebook 頭像" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const userData = ref(null);
    onMounted(() => {
      // 初始化 Facebook SDK
      window.fbAsyncInit = function () {
        FB.init({
          appId: "1214989089541346", // 這裡要替換為你的 Facebook 應用 ID
          cookie: true, // 啟用 Cookie，讓服務器能夠訪問 Session
          xfbml: true, // 解析頁面上的社交插件
          version: "v16.0", // 使用 Facebook Graph API 的版本
        });
      };
    });

    // 點擊按鈕觸發 Facebook 登入
    const loginWithFacebook = () => {
      FB.login(
        (response) => {
          if (response.authResponse) {
            console.log("登入成功", response);

            // 獲取用戶基本資料，包括頭貼
            FB.api("/me", { fields: "name, email" }, (user) => {
              // 獲取用戶頭貼
              FB.api("/me/picture?redirect=0&height=200", (response) => {
                const pictureUrl = response.data.url;
                userData.value = {
                  name: user.name,
                  email: user.email,
                  picture: pictureUrl,
                };
              });
            });
          } else {
            console.error("登入失敗", response);
          }
        },
        { scope: "email" }
      );
    };

    return {
      loginWithFacebook,
    };
  },
};
</script>
