import Vue from 'vue';
import VueCookies from 'vue-cookies';
Vue.use(VueCookies);

class CookieService {
  getCookie(name: string) {
    return Vue.$cookies.get(name);
    // let cookieValue = null;
    // if (document.cookie) {
    //   const array = document.cookie.split(escape(this.TOKEN_NAME) + '=');
    //   if (array.length >= 2) {
    //     const arraySub = array[1].split(';');
    //     cookieValue = unescape(arraySub[0]);
    //   }
    // }
    // return cookieValue;
  }

  setCookie(name: string, value: string, days: string | number | Date): void {
    Vue.$cookies.set(name, value, days);
    // const date = new Date();
    // date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    // const expires = `expires=${date.toUTCString()};
    // document.cookie = `${name}=${value};${expires};path=/`;
  }

  removeCookie(name: string) {
    Vue.$cookies.remove(name);
    // this.setCookie(this.TOKEN_NAME, '', -1);
  }
}

export default new CookieService();
