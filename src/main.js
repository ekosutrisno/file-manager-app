import { createApp } from "vue";
import { registerSW } from "virtual:pwa-register";

/**
 * Core Import
 */
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./index.css";
import directives from "./drectives";

/**
 * Dependency Import
 */
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const toastOptions = {
  hideProgressBar: true,
  timeout: 3500,
  closeButton: false,
  toastClassName: 'toast-style'
};

import VueEasyLightbox from "vue-easy-lightbox";
import VueClickAway from "vue3-click-away";

const updateSW = registerSW({
  onNeedRefresh() {
    // show a prompt to user
  },
  onOfflineReady() {
    // show a ready to work offline to user
  },
});


const app = createApp(App);

// Use Directive and Register Global
directives(app);

app.use(router);
app.use(store);
app.use(VueEasyLightbox)
app.use(VueClickAway)
app.use(Toast, toastOptions);
app.mount("#app");
