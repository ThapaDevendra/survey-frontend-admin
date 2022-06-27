import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        alias: '/users',
        name: 'users',
        component: () => import('./views/LogIn.vue')
    }
];

const router = createRouter({
    base: process.env.NODE_ENV === 'development' ? '/' : '/album-frontend/',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
 

export default router;