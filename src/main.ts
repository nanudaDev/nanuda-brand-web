import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/router/router-guard';
import MainLayout from './modules/_layouts/Layouts/MainLayout.layout.vue';
import NonLayout from './modules/_layouts/Layouts/NonLayout.layout.vue';
import LoginLayout from './modules/_layouts/Layouts/LoginLayout.layout.vue';
import LogoutLayout from './modules/_layouts/Layouts/LogoutLayout.layout.vue';
import MyPageLayout from './modules/_layouts/Layouts/MyPageLayout.layout.vue';
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/common.css';
import VueScrollTo from 'vue-scrollto';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'intersection-observer'; // Optional
import '@/core/guards/auth-role.guard';
import {
  Swiper as SwiperClass,
  Pagination,
  Mousewheel,
  Autoplay,
  EffectFade,
} from 'swiper';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
SwiperClass.use([Pagination, Mousewheel, Autoplay, EffectFade]);
import 'swiper/swiper-bundle.css';

import BaseArrow from '@/modules/_components/svg/BaseArrow.vue';
import BaseSearch from '@/modules/_components/svg/BaseSearch.vue';
import VueGtag from 'vue-gtag';

// facebook pixel
import VueFacebookPixel from 'vue-analytics-facebook-pixel';
import VueMoment from 'vue-moment';

// pipe
import {
  DatePipeTransformer,
  EnumPipeTransformer,
  PhonePipeTransformer,
  SecondsToMinutesPipeTransformer,
} from './core';
import { isEnvProd } from './common/utils/base-url.util';
DatePipeTransformer();
EnumPipeTransformer();
PhonePipeTransformer();
SecondsToMinutesPipeTransformer();

import VueEllipseProgress from 'vue-ellipse-progress';

// vue video
// import VueVideoPlayer from 'vue-video-player';
// import 'video.js/dist/video-js.css';

// odometer
import VueOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';

Vue.config.productionTip = false;

Vue.component('MainLayout', MainLayout);
Vue.component('NonLayout', NonLayout);
Vue.component('LoginLayout', LoginLayout);
Vue.component('LogoutLayout', LogoutLayout);
Vue.component('MyPageLayout', MyPageLayout);

Vue.component('BaseArrow', BaseArrow);
Vue.component('BaseSearch', BaseSearch);
Vue.component('VueOdometer', VueOdometer);

Vue.use(VueFacebookPixel);
// Vue.use(VueFacebookPixel);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(getAwesomeSwiper(SwiperClass));
Vue.use(VueMoment);
Vue.use(VueEllipseProgress);
Vue.use(VueScrollTo, {
  duration: 700,
  easing: [0, 0, 0.1, 1],
  offset: -100,
});
// Vue.use(VueVideoPlayer);

// use vue gtag
if (isEnvProd()) {
  // use facebook pixel
  (Vue as any).analytics.fbq.init('432700378140556', {
    em: 'hamrotibob@naver.com',
  });
  Vue.use(VueGtag, { config: { id: 'G-N3MZ272GVG' } });
} else {
  // (Vue as any).analytics.fbq.init('432700378140556', {
  //   em: 'hamrotibob@naver.com',
  // });
  Vue.use(VueGtag, { config: { id: 'notProd' } });
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
