import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: () => import("./components/LogIn.vue"),
  },
  {
    path: "/super-admindashboard",
    name: "adminList",
    component: () => import("./views/SuperAdmin/AdminList.vue"),
  },
  {
    path: "/super-admindashboard/addAdmin",
    name: "addAdmin",
    component: () => import("./views/SuperAdmin/AddAdmin.vue"),
  },
  {
    path: "/super-admindashboard/viewAdmin",
    name: "viewAdmin",
    component: () => import("./views/SuperAdmin/AddAdmin.vue"),
  },
  {
    path: "/super-admindashboard/editAdmin/:id",
    name: "edit",
    component: () => import("./views/SuperAdmin/EditAdmin.vue"),
  },
  {
    path: "/admindashboard/viewSurvey",
    name: "viewSurvey",
    component: () => import("./views/Admin/ViewSurvey.vue"),
  },
  {
    path: "/admindashboard/createSurvey",
    name: "createSurvey",
    component: () => import("./views/Admin/CreateSurvey.vue"),
  },
  {
    path: "/admindashboard",
    name: "admindashboard",
    component: () => import("./views/Admin/AdminDashboard.vue"),
  },
];

const router = createRouter({
  base: process.env.NODE_ENV === "development" ? "/" : "/survey-frontend/",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
