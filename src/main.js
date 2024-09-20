import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import router from '../src/router'

const pinia = createPinia();

// Facebook SDK 初始化
// window.fbAsyncInit = function () {
//   FB.init({
//     appId: "1214989089541346",
//     cookie: true,
//     xfbml: true,
//     version: "v16.0",
//   });
// };


// 加載 Facebook SDK
(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function () {
  FB.init({
    appId: '1214989089541346', // 替換為你的 Facebook 應用 ID
    xfbml: true,
    cookie: true, // 啟用 cookie 來管理會話
    version: 'v16.0' // Facebook Graph API 的版本
  });
  
  console.log('Facebook SDK initialized');
};



createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
