import HomePage from "../views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import Home from "../views/dashboard/Home.vue";
import Detail from "../views/dashboard/Detail.vue";
import Team from "../views/dashboard/Team.vue";
import Project from "../views/dashboard/Project.vue";
import Profile from "../views/dashboard/Profile.vue";

// Layouts Base Components
import LayoutDashboard from "../layout/LayoutDashboard.vue";
import LayoutWeb from "../layout/LayoutWeb.vue";

const routes = [
  {
    path: "/",
    component: LayoutWeb,
    children: [
      {
        path: "/",
        component: HomePage,
      },
      {
        path: "/u/login",
        component: LoginPage,
      },
    ],
  },
  {
    path: "/u/dashboard",
    component: LayoutDashboard,
    children: [
      {
        path: "/u/dashboard",
        component: Home,
      },
      {
        path: "/u/dashboard/bucket/:bucketName",
        component: Detail,
      },
      {
        path: "/u/dashboard/teams",
        component: Team,
      },
      {
        path: "/u/dashboard/projects",
        component: Project,
      },
      {
        path: "/u/dashboard/profile",
        component: Profile,
      },
    ],
  },
];

export default routes;
