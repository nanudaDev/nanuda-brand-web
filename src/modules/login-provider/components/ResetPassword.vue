<template>
  <div class="container">
    <b-form-group label="새 비밀번호">
      <b-form-input
        v-model="pickcookUserResetPasswordDto.password"
        type="password"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="새 비밀번호 확인">
      <b-form-input
        v-model="pickcookUserResetPasswordDto.passwordCheck"
        type="password"
      ></b-form-input>
    </b-form-group>
    <b-button variant="primary" @click="resetPassword()" block
      >비밀번호 변경하기</b-button
    >
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { PickcookUserResetPasswordDto } from '@/dto';
import AuthService from '@/services/shared/auth/auth.service';
import { Component } from 'vue-property-decorator';
import PickcookUserPasswrodService from '../../../services/pickcook-user-password.service';
import toast from '../../../../resources/assets/js/services/toast';

@Component({
  name: 'ResetPassword',
})
export default class ResetPassword extends BaseComponent {
  private pickcookUserResetPasswordDto = new PickcookUserResetPasswordDto();

  resetPassword() {
    PickcookUserPasswrodService.resetPassword(
      this.pickcookUserResetPasswordDto,
    ).subscribe(res => {
      if (res) {
        toast.success('변경이 완료되었습니다.\n로그인해주세요.');
        this.$router.push('/login');
      }
    });
  }

  validateByTempToken(token: string) {
    AuthService.validateByTempToken(token).subscribe(res => {
      if (res) {
        const user: any = res.data;
        this.pickcookUserResetPasswordDto.email = user.email;
      }
    });
  }

  created() {
    const urlQuery = location.search;
    const params = Object.fromEntries(new URLSearchParams(urlQuery));
    this.validateByTempToken(params.tempToken);
  }
}
</script>
