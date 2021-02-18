import Vue from 'vue';
import App from './App.vue';
import router from './router';
import MainLayout from './modules/_layouts/Layout/MainLayout.layout.vue';

require('./assets/css/common.css');

Vue.config.productionTip = false;
Vue.component('MainLayout', MainLayout);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
