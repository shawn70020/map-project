import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import router from '../src/router'

const pinia = createPinia();

export const fbInitPromise = new Promise((resolve) => {
  window.fbAsyncInit = function () {
    FB.init({
      appId: "1214989089541346", // 替換為你的 Facebook 應用 ID
      cookie: true,
      xfbml: true,
      version: "v16.0",
    });
    resolve(); // SDK 初始化完成，解決 Promise
  };

  // 加載 Facebook SDK
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
});

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
