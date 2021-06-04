import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

// Core
import router from "./router";
import store from "./store";

// Dependency
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const toastOptions = {
  hideProgressBar: true,
  timeout: 2500,
  closeButton: false,
};

createApp(App).use(router).use(store).use(Toast, toastOptions).mount("#app");
