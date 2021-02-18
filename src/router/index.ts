import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'main',
    component: () => import('../modules/main/AppMain.vue'),
    meta: {
      authRequired: true,
      layout: 'MainLayout',
      title: '브랜드 메인',
    },
  },
  {
    path: '/brands',
    name: 'brands',
    component: () => import('../modules/brands/BrandList.vue'),
    meta: {
      authRequired: true,
      layout: 'MainLayout',
      title: '브랜드 목록',
    },
  },
];

const router = new Router({
  mode: 'history',
  routes: routes,
});

export default router;
