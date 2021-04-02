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
    path: '/solution/:proformaId([0-9]+)',
    name: 'solution',
    component: () => import('../../modules/question/Solution.vue'),
    meta: {
      layout: 'NonLayout',
      title: '설문 조사 결과',
    },
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: () => import('../../modules/reservation/CodeInputPage.vue'),
    meta: {
      layout: 'NonLayout',
      title: '코드입력',
    },
  },
  {
    path: '/reservation/calendar',
    name: 'reservation',
    component: () => import('../../modules/reservation/Calendar.vue'),
    meta: {
      layout: 'NonLayout',
      codeRequired: true,
    },
  },
  {
    // UserProfile은 User의 <router-view> 내에 렌더링 됩니다.
    path: '/reservation/check',
    name: 'check',
    component: () => import('../../modules/reservation/Check.vue'),
    meta: {
      layout: 'NonLayout',
      codeRequired: true,
    },
  },
  {
    // UserProfile은 User의 <router-view> 내에 렌더링 됩니다.
    path: '/reservation/success',
    name: 'success',
    component: () => import('../../modules/reservation/Success.vue'),
    meta: {
      layout: 'NonLayout',
      codeRequired: true,
    },
  },
];

export default nonNavBarRouter;
