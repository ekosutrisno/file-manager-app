import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const toastOptions = {
  hideProgressBar: true,
  timeout: 2500,
  closeButton: false,
};

createApp(App).use(router).use(Toast, toastOptions).mount("#app");
