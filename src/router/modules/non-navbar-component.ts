import { RouteConfig } from 'vue-router';

const nonNavBarRouter: RouteConfig[] = [
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('../../modules/agreement/Agreement.vue'),
    meta: {
      authRequired: true,
      layout: 'NonLayout',
      title: '이용약관',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../../modules/privacy/Privacy.vue'),
    meta: {
      authRequired: true,
      layout: 'NonLayout',
      title: '개인정보취급',
    },
  },
  {
    path: '/question',
    name: 'question',
    component: () => import('../../modules/question/Question.vue'),
    meta: {
      authRequired: true,
      layout: 'NonLayout',
      title: '설문',
    },
  },
  {
    path: '/solution',
    name: 'solution',
    component: () => import('../../modules/question/Solution.vue'),
    meta: {
      layout: 'NonLayout',
    },
  },
];

export default nonNavBarRouter;
