import { RouteConfig } from 'vue-router';

export const componentRoutes: RouteConfig[] = [
  {
    path: '/services',
    name: 'Services',
    component: () => import('../../modules/services/Services.vue'),
    meta: {
      layout: 'MainLayout',
      title: '서비스소개',
    },
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import('../../modules/faq/Faq.vue'),
    meta: {
      layout: 'MainLayout',
      title: '자주묻는질문',
    },
  },
  {
    path: '/about-us',
    name: 'AboutUs',
    component: () => import('../../modules/about-us/AboutUs.vue'),
    meta: {
      layout: 'MainLayout',
      title: '회사소개',
    },
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: () => import('../../modules/reviews/Reviews.vue'),
    meta: {
      layout: 'MainLayout',
      title: '성공사례확인',
    },
  },
];
