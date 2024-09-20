<template>
  <div>
    <button @click="loginWithFacebook">Facebook 登入</button>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { defineEmits } from "vue"; // Vue 3 中用於定義事件
import { useAppStore } from "../stores/index.js";
export default {
  setup(props, { emit }) {
    const appStore = useAppStore();
    const userData = ref(null);

    // onMounted(() => {
    //   // 初始化 Facebook SDK
    //   window.fbAsyncInit = function () {
    //     FB.init({
    //       appId: "1214989089541346", // 這裡要替換為你的 Facebook 應用 ID
    //       cookie: true,
    //       xfbml: true,
    //       version: "v16.0",
    //     });
    //   };
    // });

    const loginWithFacebook = () => {
      FB.login(
        (response) => {
          if (response.authResponse) {
            console.log("登入成功", response);

            // 獲取用戶基本資料
            FB.api("/me", { fields: "name, email" }, (user) => {
              // 獲取用戶頭貼
              FB.api("/me/picture?redirect=0&height=200", (response) => {
                const pictureUrl = response.data.url;
                userData.value = {
                  name: user.name,
                  email: user.email,
                  picture: pictureUrl,
                };
                appStore.setFbUserData(userData.value);
                // 發送事件並傳遞用戶資料
                emit("login-success", userData.value);
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
