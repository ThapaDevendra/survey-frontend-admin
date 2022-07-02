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
    }
];

const router = createRouter({
    base: process.env.NODE_ENV === 'development' ? '/' : '/album-frontend/',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
 

export default router;