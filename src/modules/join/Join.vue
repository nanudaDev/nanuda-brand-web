<template>
  <article class="main-article bg-gray-200">
    <section class="article-section">
      <div class="container">
        <b-form @submit.stop.prevent="createUser()">
          <b-card no-body>
            <template #header>
              <h5 class="mb-0 txt-primary txt-bold">회원가입</h5>
            </template>
            <b-list-group>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="name" class="mb-0">이름</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-input
                      v-model="userCreateDto.name"
                      required
                      id="name"
                    ></b-form-input>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="userName" class="mb-0">아이디</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-row>
                      <b-col cols="9">
                        <b-form-input
                          v-model="userCreateDto.username"
                          required
                          id="userName"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="3">
                        <b-button
                          size="sm"
                          variant="info"
                          @click="checkUserName()"
                          :disabled="!userCreateDto.username"
                          block
                        >
                          중복체크
                        </b-button>
                      </b-col>
                    </b-form-row>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="userPhone" class="mb-0">휴대폰번호</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-row>
                      <b-col cols="9">
                        <b-form-input
                          v-model="userCreateDto.phone"
                          id="userPhone"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="3">
                        <b-button
                          size="sm"
                          variant="secondary"
                          v-if="isSendSmsCode"
                          block
                          :disabled="true"
                        >
                          전송완료
                        </b-button>
                        <b-button
                          size="sm"
                          variant="info"
                          v-if="!isSendSmsCode"
                          block
                          :disabled="!userCreateDto.phone"
                          @click="checkUserPhone()"
                        >
                          인증하기
                        </b-button>
                      </b-col>
                    </b-form-row>
                    <b-form-row class="mt-2" v-if="isSendSmsCode">
                      <b-col cols="9">
                        <b-form-input v-model="smsCode"></b-form-input>
                      </b-col>
                      <b-col cols="3">
                        <b-button
                          size="sm"
                          variant="info"
                          block
                          @click="checkSmsCode(smsCode)"
                          >인증확인</b-button
                        >
                      </b-col>
                    </b-form-row>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <b-list-group-item>
                <!-- TODO :: 이메일 인증 메일 보내고 파라미터로 확인하기 -->
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="userEmail" class="mb-0">이메일</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-input
                      v-model="userCreateDto.email"
                      id="userEmail"
                    ></b-form-input>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="userPassword" class="mb-0">비밀번호</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-input
                      v-model="userCreateDto.password"
                      type="password"
                      id="userPassword"
                    ></b-form-input>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="userPasswordCheck" class="mb-0"
                      >비밀번호 확인</label
                    >
                  </b-col>
                  <b-col cols="9">
                    <b-form-input
                      v-model="userCreateDto.passwordCheck"
                      type="password"
                      id="userPasswordCheck"
                    ></b-form-input>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="serviceAgreeYn" class="mb-0"
                      >서비스이용약관 동의</label
                    >
                  </b-col>
                  <b-col cols="9">
                    <b-form-radio-group
                      v-model="userCreateDto.serviceAgreeYn"
                      id="serviceAgreeYn"
                    >
                      <b-form-radio :value="selectYn[0]">예</b-form-radio>
                      <b-form-radio :value="selectYn[1]">아니오</b-form-radio>
                    </b-form-radio-group>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="privacyAgreeYn" class="mb-0"
                      >개인정보수집이용 동의</label
                    >
                  </b-col>
                  <b-col cols="9">
                    <b-form-radio-group
                      v-model="userCreateDto.privacyAgreeYn"
                      id="privacyAgreeYn"
                    >
                      <b-form-radio :value="selectYn[0]">예</b-form-radio>
                      <b-form-radio :value="selectYn[1]">아니오</b-form-radio>
                    </b-form-radio-group>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="marketingAgreeYn" class="mb-0"
                      >마케팅정보활용 동의</label
                    >
                  </b-col>
                  <b-col cols="9">
                    <b-form-radio-group
                      v-model="userCreateDto.marketingAgreeYn"
                      id="marketingAgreeYn"
                    >
                      <b-form-radio :value="selectYn[0]">동의</b-form-radio>
                      <b-form-radio :value="selectYn[1]">미동의</b-form-radio>
                    </b-form-radio-group>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
            </b-list-group>
            <template #footer>
              <div class="txt-right">
                <b-button size="sm" variant="primary" type="submit"
                  >회원가입</b-button
                >
              </div>
            </template>
          </b-card>
        </b-form>
      </div>
    </section>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { PickcookUserCreatDto, SmsAuthNotificationDto } from '@/dto';
import PickcookUserService from '@/services/pickcook-user.service';
import { BaseUser, SigninDto } from '@/services/shared/auth/dto';
import toast from '../../../resources/assets/js/services/toast';
import { Component } from 'vue-property-decorator';
import { CONST_YN, YN } from '@/common';
import AuthService from '@/services/shared/auth/auth.service';
import JwtStorageService from '@/services/shared/auth/jwt-storage.service';

@Component({
  name: 'Join',
})
export default class Join extends BaseComponent {
  private signinDto = new SigninDto();
  private userCreateDto = new PickcookUserCreatDto(BaseUser);
  private smsAuthNotificationDto = new SmsAuthNotificationDto();
  private smsCode = '';
  private isSendSmsCode = false;
  private selectYn: YN[] = [...CONST_YN];
  private getFromPath = sessionStorage.getItem('fromPath');

  checkUserPhone() {
    PickcookUserService.checkPhone(this.userCreateDto.phone).subscribe(res => {
      if (res) {
        this.sendSmsCode(this.userCreateDto.phone);
      }
    });
  }

  checkUserName() {
    if (this.userCreateDto.username) {
      PickcookUserService.checkUserName(this.userCreateDto.username).subscribe(
        res => {
          if (res) {
            toast.success('사용가능한 아이디 입니다.');
          } else {
            this.userCreateDto.username = '';
          }
        },
      );
    }
  }

  sendSmsCode(phone: string) {
    if (this.userCreateDto.phone) {
      PickcookUserService.sendSmsCode(phone).subscribe(res => {
        toast.success('인증번호가 전송되었습니다');
        this.isSendSmsCode = true;
      });
    }
  }

  checkSmsCode(code: string) {
    if (code) {
      this.smsAuthNotificationDto.phone = this.userCreateDto.phone;
      this.smsAuthNotificationDto.smsAuthCode = parseInt(code);
      PickcookUserService.checkSmsCode(this.smsAuthNotificationDto).subscribe(
        res => {
          if (res) {
            this.isSendSmsCode = false;
            toast.success('인증이 완료되었습니다.');
            this.smsCode = '';
          }
        },
      );
    }
  }

  clearOut() {
    this.signinDto = new SigninDto();
  }

  signin() {
    this.signinDto.loginCredential = this.userCreateDto.phone;
    this.signinDto.password = this.userCreateDto.password;
    AuthService.signin(this.signinDto).subscribe(res => {
      if (!res) {
        this.clearOut();
      } else {
        JwtStorageService.setToken(res.data, this.signinDto.rememberMe);
        if (this.getFromPath !== null && this.getFromPath !== 'login') {
          this.$router.back();
        } else {
          this.$router.push('/');
        }
      }
    });
  }

  async createUser() {
    await PickcookUserService.create(this.userCreateDto).subscribe(res => {
      if (res) {
        toast.success('회원가입이 완료되었습니다.');
        this.$router.push('/login');
      }
    });
  }
}
</script>
