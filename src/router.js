import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        alias: '/login',
        name: 'login',
        component: () => import('./components/LogIn.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('./components/Dashboard.vue')
    },
    {
        path: '/user/all',
        name: 'allusers',
        component: () => import("./views/AllUsers.vue")
    },
    {
        path: '/user/view/:id',
        name: 'viewUser',
        component: () => import("./views/ViewUser.vue")
    }
    
];

const router = createRouter({
    base: process.env.NODE_ENV === 'development' ? '/' : '/album-frontend/',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
 

export default router;