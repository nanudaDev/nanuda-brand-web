<template>
  <div id="app-login">
    <article class="main-article">
      <section class="article-section">
        <div class="container">
          <header class="section-header">
            <h3>
              <router-link to="/"
                ><img
                  src="@/assets/images/logo_w.svg"
                  alt="픽쿡"
                  class="logo-w"
                  style="width:12rem"
              /></router-link>
            </h3>
          </header>
          <div class="section-content">
            <b-form class="input-form">
              <b-form @submit.stop.prevent="signin()">
                <b-tabs fill>
                  <b-tab
                    title="아이디로 로그인"
                    @click="signinDto.isUsername = true"
                    active
                  >
                    <b-form-group class="mt-4">
                      <b-form-input
                        placeholder="아이디"
                        v-model="signinDto.loginCredential"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        placeholder="비밀번호"
                        type="password"
                        v-model="signinDto.password"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-tab>
                  <b-tab
                    title="이메일/휴대폰번호 로그인"
                    @click="signinDto.isUsername = false"
                  >
                    <b-form-group class="mt-4">
                      <b-form-input
                        placeholder="휴대전화 번호 혹은 이메일"
                        v-model="signinDto.loginCredential"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group>
                      <b-form-input
                        placeholder="비밀번호"
                        type="password"
                        v-model="signinDto.password"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-tab>
                </b-tabs>
                <b-form-group class="mt-4">
                  <b-form-checkbox v-model="signinDto.rememberMe" size="sm"
                    >로그인상태 유지</b-form-checkbox
                  >
                </b-form-group>
                <div class="btn-box mt-3">
                  <b-btn
                    variant="primary"
                    type="submit"
                    block
                    :disabled="!signinDto.loginCredential"
                  >
                    로그인
                  </b-btn>
                </div>
              </b-form>
              <div class="mt-3">
                <p>
                  아직 픽쿡 회원이 아니신가요?
                  <router-link to="/join" class="txt-primary txt-underline"
                    >회원가입</router-link
                  >
                </p>
              </div>
            </b-form>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { SigninDto } from '../../../services/shared/auth/dto';
import AuthService from '../../../services/shared/auth/auth.service';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';
import toast from '../../../../resources/assets/js/services/toast';
// import { IsValidatePhone, IsValidatePassword } from '../../../core';
import { Pagination } from '../../../common';

@Component({
  name: 'LoginLayout',
})
export default class LoginLayout extends BaseComponent {
  private signinDto = new SigninDto();

  private clearOut() {
    this.signinDto = new SigninDto();
  }

  private getFromPath = sessionStorage.getItem('fromPath');

  signin() {
    AuthService.signin(this.signinDto).subscribe(res => {
      if (res) {
        toast.success('성공적으로 로그인되었습니다.');
        JwtStorageService.setToken(res.data, this.signinDto.rememberMe);
        // 이전 라우터 path 체크해서 redirect
        if (this.getFromPath !== null && this.getFromPath !== '/login') {
          this.$router.back();
        } else {
          this.$router.push('/');
        }
      }
    });
  }

  mounted() {
    this.clearOut();
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#app-login {
  .main-article {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $primary;
    padding: 1em;
    .article-section {
      width: 100%;
      max-width: 500px;
      .section-header {
        text-align: center;
        h3 {
          font-size: 1rem;
        }
      }
      .section-content {
        margin-top: 1em;
        .input-form {
          background-color: #fff;
          padding: 1.5em;
          border-radius: 0.25em;
          label {
            display: block;
            color: #101010;
            font-weight: 600;
          }
        }
      }
    }
  }
  .tabs {
    .nav-tabs {
      .nav-item {
        .nav-link {
          color: #acacac;
          font-size: $txt-small;
          outline: none !important;
          &.active {
            font-weight: 800;
            color: $primary;
          }
        }
      }
    }
  }
}
</style>
