import CookieService from '@/services/shared/cookie/cookie.service';
class JwtStorageService {
  TOKEN_NAME = 'P_AUTH';

  getToken() {
    return CookieService.getCookie(this.TOKEN_NAME);
  }

  setToken(token: string, rememberMe?: boolean) {
    if (rememberMe) {
      CookieService.setCookie(this.TOKEN_NAME, token, '1m');
    } else {
      CookieService.setCookie(this.TOKEN_NAME, token, 0);
    }
  }

  removeToken() {
    CookieService.removeCookie(this.TOKEN_NAME);
  }
}

export default new JwtStorageService();
