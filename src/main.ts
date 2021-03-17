import Vue from 'vue';
import App from './App.vue';
import router from './router';
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

Vue.config.productionTip = false;
Vue.component('MainLayout', MainLayout);
Vue.component('NonLayout', NonLayout);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueScrollTo, {
  duration: 700,
  easing: [0, 0, 0.1, 1],
  offset: -100,
});
Vue.use(VueAwesomeSwiper /* { default global options } */);

Vue.component('BaseArrow', BaseArrow);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
