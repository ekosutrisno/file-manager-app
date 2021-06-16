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
        name: "HomePage",
        component: HomePage,
        meta: {
          title: "HomePage",
        },
      },
      {
        path: "/u/login",
        name: "LoginPage",
        component: LoginPage,
        meta: {
          title: "LoginPage",
        },
      },
    ],
  },
  {
    path: "/u/dashboard",
    component: LayoutDashboard,
    children: [
      {
        path: "/u/dashboard",
        name: "Dashboard",
        component: Home,
        meta: {
          title: "Dashboard",
        },
      },
      {
        path: "/u/dashboard/bucket/:bucketName",
        name: "Detail",
        component: Detail,
        meta: {
          title: "Drive",
        },
      },
      {
        path: "/u/dashboard/teams",
        name: "Team",
        component: Team,
        meta: {
          title: "Team",
        },
      },
      {
        path: "/u/dashboard/projects",
        name: "Project",
        component: Project,
        meta: {
          title: "Project",
        },
      },
      {
        path: "/u/dashboard/profile",
        name: "Profile",
        component: Profile,
        meta: {
          title: "Profile",
        },
      },
    ],
  },
];

export default routes;
