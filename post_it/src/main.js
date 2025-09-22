import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Vue3Lottie from "vue3-lottie";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Vue3Lottie)

const options = {
    timeout: 2000
};

app.use(Toast, options);

app.mount('#app')

export default {
  components: {
    Vue3Lottie,
  },
};
