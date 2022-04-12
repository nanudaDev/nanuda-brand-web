import Vue from 'vue';
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

class CookieService {
  getCookie(name: string) {
    return Vue.$cookies.get(name);
  }

  setCookie(name: string, value: string, days: string | number | Date): void {
    Vue.$cookies.set(name, value, days);
  }

  removeCookie(name: string) {
    Vue.$cookies.remove(name);
  }
}

export default new CookieService();
