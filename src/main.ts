import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/router/router-guard';
import MainLayout from './modules/_layouts/Layouts/MainLayout.layout.vue';
import NonLayout from './modules/_layouts/Layouts/NonLayout.layout.vue';
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/common.css';
import VueScrollTo from 'vue-scrollto';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'intersection-observer'; // Optional
import '@/core/guards/auth-role.guard';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import {
  Swiper as SwiperClass,
  Pagination,
  Mousewheel,
  Autoplay,
} from 'swiper';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
SwiperClass.use([Pagination, Mousewheel, Autoplay]);
Vue.use(getAwesomeSwiper(SwiperClass));
const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass);
import 'swiper/swiper-bundle.css';
import BaseArrow from '@/modules/_components/svg/BaseArrow.vue';
import BaseSearch from '@/modules/_components/svg/BaseSearch.vue';
// facebook pixel

import VueFacebookPixel from 'vue-analytics-facebook-pixel';
import VueMoment from 'vue-moment';
Vue.config.productionTip = false;
Vue.component('MainLayout', MainLayout);
Vue.component('NonLayout', NonLayout);
Vue.component('BaseArrow', BaseArrow);
Vue.component('BaseSearch', BaseSearch);
Vue.use(VueFacebookPixel);
// Vue.use(VueFacebookPixel);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(VueMoment);

Vue.use(VueScrollTo, {
  duration: 700,
  easing: [0, 0, 0.1, 1],
  offset: -100,
});
Vue.use(VueAwesomeSwiper /* { default global options } */);
(Vue as any).analytics.fbq.init('932827054153408', {
  em: 'lsj@widaehan.com',
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
