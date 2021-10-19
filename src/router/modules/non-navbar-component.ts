import { RouteConfig } from 'vue-router';

const nonNavBarRouter: RouteConfig[] = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import('../../modules/_layouts/Layouts/LoginLayout.layout.vue'),
    meta: {
      layout: 'LoginLayout',
      title: '로그인',
      beforeGetAuth: true,
    },
  },
  {
    path: '/join',
    name: 'join',
    component: () => import('../../modules/join/Join.vue'),
    meta: {
      layout: 'MyPageLayout',
      title: '회원가입',
      beforeGetAuth: true,
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      layout: 'LogoutLayout',
    },
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () =>
      import('../../modules/mypage/components/AccountDetail.vue'),
    children: [
      {
        path: '/mypage/account',
        name: 'mypage-account',
        component: () =>
          import('../../modules/mypage/components/AccountDetail.vue'),
        meta: {
          layout: 'MyPageLayout',
          title: '계정설정',
          authRequired: true,
        },
      },
    ],
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('../../modules/agreement/Agreement.vue'),
    meta: {
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
    path: '/reservation',
    name: 'reservation',
    component: () => import('../../modules/reservation/Login.vue'),
    meta: {
      layout: 'NonLayout',
      title: '코드 입력',
    },
  },
  {
    path: '/reservation/calendar',
    name: 'calendar',
    component: () => import('../../modules/reservation/Calendar.vue'),
    meta: {
      layout: 'NonLayout',
      codeRequired: true,
      title: '예약하기',
    },
  },
  {
    // UserProfile은 User의 <router-view> 내에 렌더링 됩니다.
    path: '/reservation/:id([0-9]+)',
    name: 'check',
    component: () => import('../../modules/reservation/Check.vue'),
    meta: {
      layout: 'NonLayout',
      codeRequired: true,
      title: '예약 확인',
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
      title: '예약 성공',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../../modules/register/Register.vue'),
    meta: {
      layout: 'NonLayout',
      title: '배달창업, 픽쿡',
    },
  },
  {
    path: '/tutorials/just-salad',
    name: 'just-salad',
    component: () => import('../../modules/tutorials/JustSalad.vue'),
    meta: {
      layout: 'NonLayout',
      title: '저스트샐러드 교육페이지',
    },
  },
];

export default nonNavBarRouter;
