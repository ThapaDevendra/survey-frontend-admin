import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        alias: '/login',
        name: 'login',
        component: () => import('./components/LogIn.vue')
    },
    {
        path: '/super-admindashboard',
        name: 'adminList',
        component: () => import('./views/AdminList.vue')
    },
    {
        path: '/super-admindashboard/addAdmin',
        name: 'addAdmin',
        component: () => import('./views/AddAdmin.vue')
    }
    
];

const router = createRouter({
    base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend/',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
 

export default router;
