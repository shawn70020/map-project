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
}(document, 'script', 'facebook-jssdk')
);


window.fbAsyncInit = function () {

  FB.init({
    appId: '1214989089541346',
    xfbml: true,
    version: 'v16.0'
  });

  FB.login(function (response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', { fields: 'name, email' }, function (response) {
        document.getElementById("profile").innerHTML = "Good to see you, " + response.name + ". i see your email address is " + response.email
      });
    } else {

      console.log('User cancelled login or did not fully authorize.');
    }
  });
};

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
