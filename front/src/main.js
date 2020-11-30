import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css';
import axios from "axios";
import cookies from "js-cookie";
import store from './store'

Vue.config.productionTip = false

// Глобальные настройки axios
Vue.prototype.$axios = axios;
// Установка базового пути для api
axios.defaults.baseURL = "http://localhost:9000";
// Авторизация
axios.interceptors.request.use(function (config) {
  // Ставим индикатор загрузки перед запросом
  store.commit("sys/setLoader", true);
  const token = cookies.get("x-access-token");
  if (token) {
    config.headers.common["x-access-token"] = token;
  } else {
    delete config.headers.common["x-access-token"];
  }
  return config;
});
axios.interceptors.response.use(function (response) {
  // Отключаем индикатор загрузки после запроса
  store.commit("sys/setLoader", false);
  return response;
});

new Vue({
  router,
  store,
  render: h => h(App)  
}).$mount('#app')
