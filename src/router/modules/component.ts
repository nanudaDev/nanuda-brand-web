import { RouteConfig } from 'vue-router';

export const componentRoutes: RouteConfig[] = [
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import('../../modules/about-us/AboutUs.vue'),
    meta: {
      layout: 'MainLayout',
      title: '회사소개',
    },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../../modules/services/Services.vue'),
    meta: {
      layout: 'MainLayout',
      title: '서비스소개',
    },
  },
  // {
  //   path: '/faq',
  //   name: 'faq',
  //   component: () => import('../../modules/faq/Faq.vue'),
  //   meta: {
  //     layout: 'MainLayout',
  //     title: '자주묻는질문',
  //   },
  // },

  // {
  //   path: '/reviews',
  //   name: 'reviews',
  //   component: () => import('../../modules/reviews/Reviews.vue'),
  //   meta: {
  //     layout: 'MainLayout',
  //     title: '성공사례확인',
  //   },
  // },
];
