import { createApp } from "vue";

/**
 * Core Import
 */
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./index.css";

/**
 * Dependency Import
 */
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const toastOptions = {
  hideProgressBar: true,
  timeout: 2500,
  closeButton: false,
};

import VueEasyLightbox from "vue-easy-lightbox";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueEasyLightbox)
app.use(Toast, toastOptions);
app.mount("#app");
