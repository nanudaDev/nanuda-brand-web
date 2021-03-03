import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import { componentRoutes } from './modules';

Vue.use(Router);

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('../modules/main/Main.vue'),
    meta: {
      layout: 'MainLayout',
      title: '메인',
    },
  },
  ...componentRoutes,
];

const router = new Router({
  mode: 'history',
  routes: routes,
});

export default router;
