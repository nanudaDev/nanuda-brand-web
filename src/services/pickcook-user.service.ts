import { BaseService } from '@/core';
import {
  PickcookUserCheckPasswordDto,
  PickcookUserCreatDto,
  PickcookUserDto,
  PickcookUserUpdatePasswordDto,
  SmsAuthNotificationDto,
} from '@/dto';
import { PickcookUserUpdateDto } from '@/dto/pickcook-user/pickcook-user-update.dto';

class PickcookUserService extends BaseService {
  findMe() {
    return this.get<PickcookUserDto>('pickcook-user/find-me');
  }

  /**
   *
   * @param pickcookUserCreateDto
   * @returns
   */
  create(pickcookUserCreateDto: PickcookUserCreatDto) {
    return this.post<PickcookUserCreatDto>(
      'pickcook-user',
      pickcookUserCreateDto,
    );
  }

  /**
   *
   * @param pickcookUserUpdateDto
   * @returns
   */
  update(pickcookUserUpdateDto: PickcookUserUpdateDto) {
    return this.patch<PickcookUserUpdateDto>(
      'pickcook-user',
      pickcookUserUpdateDto,
    );
  }

  /**
   *
   * @param pickcookUserUpdatePasswordDto
   * @returns
   */
  updatePassword(pickcookUserUpdatePasswordDto: PickcookUserUpdatePasswordDto) {
    return this.patch<PickcookUserUpdatePasswordDto>(
      'auth/pickcook-user/change-password',
      pickcookUserUpdatePasswordDto,
    );
  }

  /**
   *
   * @param pickcookUserCheckPasswordDto
   * @returns
   */
  checkPassword(pickcookUserCheckPasswordDto: PickcookUserCheckPasswordDto) {
    return this.post<PickcookUserCheckPasswordDto>(
      'auth/pickcook-user/check-password',
      pickcookUserCheckPasswordDto,
    );
  }

  /**
   *
   * @param userName
   * @returns
   */
  checkUserName(userName: string) {
    return this.get<any>('pickcook-user/check-username', {
      username: userName,
    });
  }

  /**
   *
   * @param email
   * @returns
   */
  checkEmail(email: string) {
    return this.get<any>('pickcook-user/check-email', {
      email: email,
    });
  }

  /**
   *
   * @param phone
   * @returns
   */
  checkPhone(phone: string) {
    return this.get<string>('pickcook-user/check-phone', {
      phone: phone,
    });
  }

  /**
   *
   * @param phone
   * @returns
   */
  sendSmsCode(phone: string) {
    return this.post<string>('sms-notification/register-sms-code', {
      phone: phone,
    });
  }

  /**
   *
   * @param smsAuthNotificationDto
   * @returns
   */
  checkSmsCode(smsAuthNotificationDto: SmsAuthNotificationDto) {
    return this.post<SmsAuthNotificationDto>(
      'check-sms-code',
      smsAuthNotificationDto,
    );
  }

  /**
   *
   * @returns
   */
  withdraw() {
    return this.delete('pickcook-user/withdraw');
  }
}

export default new PickcookUserService();
