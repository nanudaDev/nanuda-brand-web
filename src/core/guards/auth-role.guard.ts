import { Route } from 'vue-router';
import router from '@/router';

const getPageTitle = (title?: string) => {
  const hasTitle = `${title}`;
  if (hasTitle) {
    return hasTitle;
  }
  return '픽쿡 - 실패 없는 창업 안내합니다';
};

router.afterEach((to: Route) => {
  // set page title
  if (to.meta.main) {
    document.title = getPageTitle(`${to.meta.title}`);
  } else {
    document.title = getPageTitle(`${to.meta.title} - 픽쿡`);
  }
});
