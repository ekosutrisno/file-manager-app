import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
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

router.beforeEach((to, from, next) =>{
  document.title = `LiBox - ${to.meta.title}`;
  next();
})

export default router;
