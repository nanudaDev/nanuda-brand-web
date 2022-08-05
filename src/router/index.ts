import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { componentRoutes } from './modules';
import nonNavBarRouter from './modules/non-navbar-component';

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('../modules/renewal/Renewal.vue'),
    meta: {
      layout: 'NonLayout',
      title: '픽쿡 - 실패 없는 창업을 안내합니다',
      main: true,
    },
  },
  { path: '*', redirect: '/' }
  // ...componentRoutes,
  // ...nonNavBarRouter,
];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
