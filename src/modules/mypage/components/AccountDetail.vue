<template>
  <article v-if="userDto" class="main-article bg-gray-200">
    <section class="article-section">
      <div class="container">
        <div class="row-box">
          <b-card no-body>
            <template #header>
              <h5 class="mb-0 txt-primary txt-bold">계정정보</h5>
            </template>
            <b-list-group>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="name" class="mb-0">이름</label>
                  </b-col>
                  <b-col cols="9">
                    <b-form-input
                      v-model="setName"
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
                          v-model="setUserName"
                          required
                          id="userName"
                          :disabled="!isChangeUserName"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="3">
                        <b-button
                          size="sm"
                          variant="outline-secondary"
                          @click="isChangeUserName = true"
                          block
                          v-if="!isChangeUserName"
                          >변경하기</b-button
                        >
                        <b-form-row v-if="isChangeUserName">
                          <b-col cols="6">
                            <b-button
                              size="sm"
                              variant="info"
                              @click="changeUserName()"
                              block
                            >
                              저장
                            </b-button>
                          </b-col>
                          <b-col cols="6">
                            <b-button
                              size="sm"
                              variant="secondary"
                              block
                              @click="isChangeUserName = false"
                              >취소</b-button
                            >
                          </b-col>
                        </b-form-row>
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
                          v-model="setUserPhone"
                          id="userPhone"
                          :disabled="!isChangeUserPhone"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="3">
                        <b-button
                          size="sm"
                          variant="outline-secondary"
                          block
                          v-if="!isSendSmsCode && !isChangeUserPhone"
                          :disabled="isChangeUserPhone"
                          @click="isChangeUserPhone = true"
                          >변경하기</b-button
                        >
                        <b-button
                          size="sm"
                          variant="secondary"
                          v-if="isSendSmsCode"
                          block
                          :disabled="true"
                        >
                          전송완료
                        </b-button>
                        <b-form-row v-if="isChangeUserPhone">
                          <b-col cols="6">
                            <b-button
                              size="sm"
                              variant="info"
                              block
                              @click="changeUserPhone()"
                            >
                              인증하기
                            </b-button>
                          </b-col>
                          <b-col cols="6">
                            <b-button
                              size="sm"
                              variant="secondary"
                              block
                              @click="isChangeUserPhone = false"
                              >취소</b-button
                            >
                          </b-col>
                        </b-form-row>
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
                      v-model="userUpdateDto.email"
                      id="userEmail"
                    ></b-form-input>
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <!-- <b-list-group-item>
              <b-form-row class="align-items-center">
                <b-col cols="3">
                  <label for="serviceAgreeYn" class="mb-0"
                    >서비스이용약관 동의</label
                  >
                </b-col>
                <b-col cols="9">
                  <b-form-radio-group
                    v-model="userUpdateDto.serviceAgreeYn"
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
                    v-model="userUpdateDto.privacyAgreeYn"
                    id="privacyAgreeYn"
                  >
                    <b-form-radio :value="selectYn[0]">예</b-form-radio>
                    <b-form-radio :value="selectYn[1]">아니오</b-form-radio>
                  </b-form-radio-group>
                </b-col>
              </b-form-row>
            </b-list-group-item> -->
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="marketingAgreeYn" class="mb-0"
                      >마케팅정보활용 동의</label
                    >
                  </b-col>
                  <b-col cols="9">
                    <b-form-radio-group
                      v-model="setMarketingAgreeYn"
                      id="marketingAgreeYn"
                    >
                      <b-form-radio :value="selectYn[0]">동의</b-form-radio>
                      <b-form-radio :value="selectYn[1]">미동의</b-form-radio>
                    </b-form-radio-group>
                    <!-- #TODO : needs refactoring -->
                    <!-- <template v-if="userUpdateDto.marketingAgreeYn">
                      <span class="txt-info">
                        {{
                          userUpdateDto.marketingAgreeYn === 'Y'
                            ? userUpdateDto.marketingAgreeDate
                            : userUpdateDto.marketingDisagreeDate
                              | dateTransformer
                        }}
                      </span>
                      에 변경되었습니다.
                    </template> -->
                  </b-col>
                </b-form-row>
              </b-list-group-item>
              <b-list-group-item>
                <b-form-row class="align-items-center">
                  <b-col cols="3">
                    <label for="lastLoginAt" class="mb-0"
                      >최근 로그인 일시</label
                    >
                  </b-col>
                  <b-col cols="9">
                    {{ userUpdateDto.lastLoginAt | dateTransformer }}
                  </b-col>
                </b-form-row>
              </b-list-group-item>
            </b-list-group>
            <template #footer>
              <div class="txt-right">
                <b-button
                  size="sm"
                  variant="outline-info"
                  v-b-modal.update_password
                  >비밀번호 변경하기</b-button
                >
                <b-button size="sm" variant="primary" @click="updateUser()"
                  >수정</b-button
                >
              </div>
            </template>
          </b-card>
        </div>
        <div class="row-box">
          <b-card>
            <template #header>
              <h5 class="mb-0 txt-primary txt-bold">탈퇴하기</h5>
            </template>
            <b-row no-gutters align-h="between" align-v="center">
              <b-card-text>
                탈퇴 시 모든 정보가 삭제되며, 복구가 불가능 합니다. <br />
                사이트 탙퇴를 원하시면
                <span class="txt-red txt-bold">"탈퇴하기"</span> 버튼을
                눌러주세요
              </b-card-text>
              <b-button
                size="sm"
                variant="outline-danger"
                v-b-modal.user_withdraw
                >탈퇴하기</b-button
              >
            </b-row>
          </b-card>
        </div>
      </div>
    </section>
    <!-- 비밀번호 변경 모달 -->
    <b-modal id="update_password" title="비밀번호 변경하기" hide-footer>
      <b-form @submit.stop.prevent="checkPassword()">
        <b-form-row class="align-items-center">
          <b-col cols="4">
            <label for="checkPassword" class="mb-0">기존 비밀번호</label>
          </b-col>
          <b-col cols="8">
            <b-form-input
              v-model="userCheckPasswordDto.password"
              required
              type="password"
              id="checkPassword"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row class="align-items-center mt-2">
          <b-col cols="4">
            <label for="updatePassword" class="mb-0">새 비밀번호</label>
          </b-col>
          <b-col cols="8">
            <b-form-input
              v-model="userUpdatePasswordDto.password"
              required
              type="password"
              id="updatePassword"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <b-form-row class="align-items-center mt-2">
          <b-col cols="4">
            <label for="updatePasswordCheck" class="mb-0"
              >새 비밀번호 확인</label
            >
          </b-col>
          <b-col cols="8">
            <b-form-input
              v-model="userUpdatePasswordDto.passwordCheck"
              required
              type="password"
              id="updatePasswordCheck"
            ></b-form-input>
          </b-col>
        </b-form-row>
        <div class="txt-right mt-4">
          <b-button variant="primary" type="submit">변경하기</b-button>
        </div>
      </b-form>
    </b-modal>
    <!-- 탈퇴하기 모달 -->
    <b-modal
      title="탈퇴하기"
      id="user_withdraw"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <p class="txt-center">정말 탈퇴하시겠습니까?</p>
      <div class="txt-right">
        <b-button size="sm" variant="danger" @click="withdraw()">탈퇴</b-button>
      </div>
    </b-modal>
    <b-spinner label="Loading..." v-if="isLoading"></b-spinner>
  </article>
</template>
<script lang="ts">
import { CONST_YN, YN } from '@/common';
import BaseComponent from '@/core/base.component';
import {
  PickcookUserCheckPasswordDto,
  PickcookUserDto,
  PickcookUserUpdateDto,
  PickcookUserUpdatePasswordDto,
  SmsAuthNotificationDto,
} from '@/dto';
import PickcookUserService from '@/services/pickcook-user.service';
import { BaseUser } from '@/services/shared/auth/dto';
import JwtStorageService from '@/services/shared/auth/jwt-storage.service';
import { Component, Watch } from 'vue-property-decorator';
import toast from '../../../../resources/assets/js/services/toast';

@Component({
  name: 'AccountDetail',
})
export default class AccountDetail extends BaseComponent {
  private isLoading = false;
  private userDto = new PickcookUserDto(BaseUser);
  private userUpdateDto = new PickcookUserUpdateDto(BaseUser);
  private userUpdatePasswordDto = new PickcookUserUpdatePasswordDto();
  private userCheckPasswordDto = new PickcookUserCheckPasswordDto();
  private smsCode = '';
  private setName = '';
  private setUserName = '';
  private setUserPhone = '';
  private isChangeUserName = false;
  private isChangeUserPhone = false;
  private isSendSmsCode = false;
  private isCheckSmsCode = false;
  private selectYn: YN[] = [...CONST_YN];
  private smsAuthNotificationDto = new SmsAuthNotificationDto();
  private setMarketingAgreeYn: YN = null;

  withdraw() {
    PickcookUserService.withdraw().subscribe(async res => {
      if (res) {
        await this.$root.$emit('withdraw');
        toast.success('탈퇴가 성공적으로 처리 되었습니다.');
      }
    });
  }

  findMe() {
    PickcookUserService.findMe().subscribe(res => {
      if (res) {
        this.userDto = res.data;
        this.userUpdateDto = this.userDto;
        this.setName = this.userDto.name;
        this.setUserName = this.userDto.username;
        this.setUserPhone = this.userDto.phone;
        this.setMarketingAgreeYn = this.userDto.marketingAgreeYn;
      }
    });
  }

  changeUserName() {
    if (this.setUserName !== this.userDto.username) {
      this.checkUserName();
    } else {
      toast.error('기존 닉네임과 동일합니다');
    }
  }

  checkUserName() {
    PickcookUserService.checkUserName(this.setUserName).subscribe(res => {
      if (res) {
        this.updateUserName();
        this.isChangeUserName = false;
      }
    });
  }

  async checkPassword() {
    await PickcookUserService.checkPassword(
      this.userCheckPasswordDto,
    ).subscribe(res => {
      if (res) {
        return this.updatePassword();
      }
    });
  }

  clearOutUpdatePassword() {
    this.userCheckPasswordDto = new PickcookUserCheckPasswordDto();
    this.userUpdatePasswordDto = new PickcookUserUpdatePasswordDto();
  }

  updatePassword() {
    if (
      this.userCheckPasswordDto.password === this.userUpdatePasswordDto.password
    ) {
      toast.error('기존 비밀번호와 동일합니다.');
      return;
    }
    PickcookUserService.updatePassword(this.userUpdatePasswordDto).subscribe(
      res => {
        if (res) {
          toast.success('비밀번호가 성공적으로 변경 되었습니다.');
          this.$bvModal.hide('update_password');
          this.clearOutUpdatePassword();
        }
      },
    );
  }

  updateUserName() {
    if (this.setUserName) {
      this.userUpdateDto.username = this.setUserName;
    }
    PickcookUserService.update(this.userUpdateDto).subscribe(res => {
      if (res) {
        toast.success('닉네임이 변경되었습니다.');
        this.findMe();
      }
    });
  }

  changeUserPhone() {
    if (this.setUserPhone !== this.userDto.phone) {
      this.checkUserPhone();
      this.isChangeUserPhone = false;
    } else {
      toast.error('기존 번호와 동일합니다');
    }
  }

  checkUserPhone() {
    PickcookUserService.checkPhone(this.setUserPhone).subscribe(res => {
      if (res) {
        this.sendSmsCode(this.setUserPhone);
      }
    });
  }

  updateUserPhone() {
    if (this.setUserPhone) {
      this.userUpdateDto.phone = this.setUserPhone;
    }
    PickcookUserService.update(this.userUpdateDto).subscribe(res => {
      if (res) {
        toast.success('휴대폰번호 인증이 완료되었습니다.');
        this.isChangeUserPhone = false;
        this.findMe();
      }
    });
  }

  sendSmsCode(phone: string) {
    if (this.checkUserPhone) {
      PickcookUserService.sendSmsCode(phone).subscribe(res => {
        toast.success('인증번호가 전송되었습니다');
        this.isSendSmsCode = true;
      });
    }
  }

  checkSmsCode(code: string) {
    if (code) {
      this.smsAuthNotificationDto.phone = this.userUpdateDto.phone;
      this.smsAuthNotificationDto.smsAuthCode = parseInt(code);
      PickcookUserService.checkSmsCode(this.smsAuthNotificationDto).subscribe(
        res => {
          if (res) {
            this.updateUserPhone();
            this.isSendSmsCode = false;
            this.smsCode = '';
          }
        },
      );
    }
  }

  updateUser() {
    this.userUpdateDto.name = this.setName;
    this.userUpdateDto.marketingAgreeYn = this.setMarketingAgreeYn;
    PickcookUserService.update(this.userUpdateDto).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findMe();
      }
    });
  }

  created() {
    this.findMe();
  }
}
</script>
