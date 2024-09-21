<template>
  <div>
    <div class="fb-logo" @click="loginWithFacebook">
      <img
        src="../../public/img/fb-logo.svg"
        alt="fb-btn"
      />
      使用 Facebook 帳戶登入
    </div>
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

    const statusChangeCallback = (response) => {
      if (response.status === "connected") {
        // 用戶已經登入並且授權應用
        console.log("User is already logged in and authorized.");
        fetchFacebookUserData(); // 直接獲取用戶資料
      } else {
        // 如果用戶未登入或未授權，執行登入操作
        FB.login(
          (response) => {
            if (response.authResponse) {
              console.log("登入成功", response);
              fetchFacebookUserData(); // 獲取用戶資料
            } else {
              console.error("登入失敗", response);
            }
          },
          { scope: "email" }
        );
      }
    };

    const fetchFacebookUserData = () => {
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
    };

    const loginWithFacebook = async () => {
      // 檢查當前用戶登入狀態
      FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };

    return {
      loginWithFacebook,
    };
  },
};
</script>
