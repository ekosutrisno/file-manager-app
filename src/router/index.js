import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

export default createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  history: createWebHistory(),
  routes,
});
