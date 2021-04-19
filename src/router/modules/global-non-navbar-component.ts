import { RouteConfig } from 'vue-router';

const globalNonNavBarRouter: RouteConfig[] = [
  {
    path: '/site-under-construction',
    component: () =>
      import('../../modules/_layouts/Layouts/SiteInConstruction.layout.vue'),
    meta: {
      layout: 'SiteInConstructionLayout',
      title: '현재 서비스 점검중입니다',
    },
  },
];

export default globalNonNavBarRouter;
