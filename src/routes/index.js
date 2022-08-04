import { createWebHistory, createRouter } from "vue-router";
import login from './login';
import superadmin from './superadmin';
import admin from './admin'

const routes = [
    ...login,
    ...superadmin,
    ...admin
]

const router = createRouter({
    base: process.env.NODE_ENV === 'development' ? '/' : '/survey-frontend/',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

export default router;
