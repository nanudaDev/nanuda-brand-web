import { BaseService } from '@/core';
import { SigninDto } from './dto';
import JwtStorageService from './jwt-storage.service';
import { Observable } from 'rxjs';

class AuthService extends BaseService {
  signin(credential: SigninDto): Observable<any> {
    return this.post('auth/pickcook-user/login', credential);
  }

  signout() {
    JwtStorageService.removeToken();
  }

  validateByTempToken(token: string) {
    return this.post('auth/pickcook-user/validate-temp-token', {
      token: token,
    });
  }
}

export default new AuthService();
