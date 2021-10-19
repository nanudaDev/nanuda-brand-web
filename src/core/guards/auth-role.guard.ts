import { Route } from 'vue-router';
import router from '@/router';
import JwtStorageService from '@/services/shared/auth/jwt-storage.service';
import jwtDecode from 'jwt-decode';
import Vue from 'vue';
import toast from '../../../resources/assets/js/services/toast';

const getPageTitle = (title?: string) => {
  const hasTitle = `${title}`;
  if (hasTitle) {
    return hasTitle;
  }
  return '픽쿡 - 실패 없는 창업 안내합니다';
};

router.beforeEach(async (to, from, next) => {
  const vm = new Vue();
  const token = JwtStorageService.getToken();
  if (to.meta.authRequired) {
    if (!token) {
      toast.warn('로그인이 필요한 서비스입니다');
      next('/login');
      return;
    }
    const payload = await jwtDecode(token);
    if (!payload) {
      JwtStorageService.removeToken();
      next('/login');
      return;
    }
  }

  if (to.meta.beforeGetAuth) {
    // 로그인 전에만 접근 가능
    if (token) {
      toast.warn('현재 로그인 상태입니다');
      next('/');
      return;
    }
  }

  next();
  return;
});

router.afterEach((to, from) => {
  // 로그아웃 시 권한 필요한 페이지는 메인으로
  if (from.meta.authRequired) {
    router.push('/');
  }

  // set page title
  if (to.meta.main) {
    document.title = getPageTitle(`${to.meta.title}`);
  } else {
    document.title = getPageTitle(`${to.meta.title} - 픽쿡`);
  }
});
