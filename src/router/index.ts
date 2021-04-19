import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { componentRoutes } from './modules';
import globalNonNavBarRouter from './modules/global-non-navbar-component';
import nonNavBarRouter from './modules/non-navbar-component';

Vue.use(VueRouter);

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('../modules/main/Main.vue'),
    meta: {
      layout: 'MainLayout',
      title: '픽쿡 - 실패 없는 창업을 안내합니다',
      main: true,
    },
  },
  ...componentRoutes,
  ...nonNavBarRouter,
  ...globalNonNavBarRouter,
];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

export default router;
