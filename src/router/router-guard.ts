import router from '@/router';

router.beforeEach((to, from, next) => {
  if (to.meta.codeRequired) {
    if (sessionStorage.getItem('reservationCode')) {
      next();
    } else {
      next('/reservation');
    }
  }
  next();
});
