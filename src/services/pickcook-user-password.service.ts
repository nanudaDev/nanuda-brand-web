import { BaseService } from '@/core';
import { PickcookUserResetPasswordDto } from '@/dto';

class PickcookUserPasswordService extends BaseService {
  async forgotPassword() {
    console.log('forgot password');
    return await true;
  }

  resetPassword(pickcookUserResetPasswordDto: PickcookUserResetPasswordDto) {
    return this.patch<PickcookUserResetPasswordDto>(
      'auth/pickcook-user/reset-password',
      pickcookUserResetPasswordDto,
    );
  }
}

export default new PickcookUserPasswordService();
